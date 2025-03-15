import '../../../src/conf/loadEnv.js'

import { PsychicServer } from '@rvoh/psychic'
import { launchViteServer, stopViteServer } from '@rvoh/psychic-spec-helpers'
import initializePsychicApplication from '../../../src/conf/initializePsychicApplication.js'

let server: PsychicServer

export async function setup() {
  await initializePsychicApplication()

  server = new PsychicServer()
  await server.start(parseInt(process.env.DEV_SERVER_PORT || '7778'))

  await launchViteServer({ port: 3000, cmd: 'yarn client:fspec' })
}

export async function teardown() {
  stopViteServer()
  await server.stop()
}
