import '../../../src/conf/loadEnv'

import { launchViteServer, stopViteServer } from '@rvoh/psychic-spec-helpers'
import initializePsychicApplication from '../../../src/conf/initializePsychicApplication'

export async function setup() {
  await initializePsychicApplication()
  await launchViteServer({ port: 3000, cmd: 'yarn client' })
}

export function teardown() {
  stopViteServer()
}
