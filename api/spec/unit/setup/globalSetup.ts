import '../../../src/conf/loadEnv'

import { PsychicBin } from '@rvoh/psychic'
import initializePsychicApplication from '../../../src/conf/initializePsychicApplication'

export async function setup() {
  await initializePsychicApplication()
  await PsychicBin.syncOpenapiJson()
}

export async function teardown() {
  // your custom teardown...
}
