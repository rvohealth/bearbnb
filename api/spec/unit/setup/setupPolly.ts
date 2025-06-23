/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import NodeFetchAdapter from '@pollyjs/adapter-fetch'
import NodeHttpAdapter from '@pollyjs/adapter-node-http'
import { Polly } from '@pollyjs/core'
import FSPersister from '@pollyjs/persister-fs'
import { debuglog } from 'node:util'

// Enable debug logging with NODE_DEBUG=polly
const debugPolly = debuglog('polly').enabled

Polly.register(NodeFetchAdapter as any)
Polly.register(NodeHttpAdapter as any)

/**
 * Activates Polly in the current spec context for HTTP recording and replay in tests.
 * Typically placed in a `beforeEach` block in your test files.
 *
 * @param options - Configuration options for the Polly instance
 * @param options.ignoreHeaderDiffs - When true, HTTP header differences are ignored during request matching.
 *                                   Default: true
 * @param options.recordFailedRequests - When true, failed HTTP requests (non-2xx responses) will be recorded.
 *                                      Default: false
 *
 * @example
 * beforeEach(() => {
 *   setupPolly();
 * });
 *
 * @example
 * // With custom options
 * beforeEach(() => {
 *   setupPolly({
 *     ignoreHeaderDiffs: false,
 *     recordFailedRequests: true
 *   });
 * });
 *
 * @returns The configured Polly instance that can be used for additional customization (e.g., for setting Polly to record/replay traffic to/from additional domains, as in `polly.server.any('https://new-domain-to-record/*').passthrough(false)`). Domains that should always be recorded should be added to `setupPolly`.
 */
export default function setupPolly({
  ignoreHeaderDiffs = true,
  recordFailedRequests = false,
}: { ignoreHeaderDiffs?: boolean; recordFailedRequests?: boolean } = {}) {
  const recordingName =
    expect
      .getState()
      .currentTestName?.replace(/ /g, '-')
      ?.replace(/[^a-zA-Z0-9.>_-]/g, '') ?? '__MISSING_CURRENT_TEST_NAME__'

  const polly = new Polly(recordingName, {
    mode: process.env.POLLY_RECORD ? 'record' : 'replay',
    adapters: [NodeHttpAdapter as any, NodeFetchAdapter as any],
    persister: FSPersister as any,
    recordIfMissing: false,
    logLevel: debugPolly ? 'debug' : 'error',
  })

  polly.configure({ matchRequestsBy: { headers: !ignoreHeaderDiffs }, recordFailedRequests })

  const excludedRequestHeaders = ['authorization', 'user-agent']
  polly.server.any().on('beforePersist', (req, recording) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    recording.request.headers = recording.request.headers.filter(
      ({ name }: any) => !excludedRequestHeaders.includes(name)
    )
  })

  // Default: simply passthrough all URLs
  polly.server.any().passthrough()

  // Then: add passthrough(false) for all URLs you want to record
  polly.server.any(`${process.env.SOME_SAAS_HOST}/*`).passthrough(false)

  // Last: add passthrough(true) for URLs encompassed by wildcard URLs that you have set to passthrough(false)
  // but that you don't want recorded
  polly.server
    .any(`${process.env.SOME_SAAS_HOST}/${process.env.API_ID_FOR_SOME_SAAS_HOST}/oauth2/v2.0/token`)
    .passthrough(false)

  onTestFinished(async () => await polly.stop())

  return polly
}
