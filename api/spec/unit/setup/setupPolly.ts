import NodeFetchAdapter from '@pollyjs/adapter-fetch'
import NodeHttpAdapter from '@pollyjs/adapter-node-http'
import { Polly } from '@pollyjs/core'
import FSPersister from '@pollyjs/persister-fs'

Polly.register(NodeFetchAdapter)
Polly.register(NodeHttpAdapter)

export default function ({
  ignoreHeaderDiffs = false,
  recordFailedRequests = false,
}: { ignoreHeaderDiffs?: boolean; recordFailedRequests?: boolean } = {}) {
  const recordingName =
    expect
      .getState()
      .currentTestName?.replace(/ /g, '-')
      ?.replace(/[^a-zA-Z0-9.>_-]/g, '') ?? '__MISSING_CURRENT_TEST_NAME__'

  const polly = new Polly(recordingName, {
    mode: process.env.POLLY_RECORD ? 'record' : 'replay',
    adapters: [NodeHttpAdapter, NodeFetchAdapter],
    persister: FSPersister,
    recordIfMissing: false,
    logLevel: process.env.DEBUG ? 'debug' : 'error',
  })

  polly.configure({
    matchRequestsBy: {
      headers: !ignoreHeaderDiffs,
    },
    recordFailedRequests: !!recordFailedRequests,
  })

  const excludedRequestHeaders = ['authorization', 'user-agent']
  polly.server.any().on('beforePersist', (req, recording) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    recording.request.headers = recording.request.headers.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
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
