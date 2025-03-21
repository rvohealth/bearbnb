import '../../../src/conf/loadEnv.js'

import { PsychicDevtools } from '@rvoh/psychic'

export async function setup() {
  await PsychicDevtools.launchDevServer('clientFspecApp', { port: 3000, cmd: 'yarn client:fspec' })
  await PsychicDevtools.launchDevServer('adminFspecApp', { port: 3001, cmd: 'yarn admin:fspec' })
}

export function teardown() {
  PsychicDevtools.stopDevServer('clientFspecApp')
  PsychicDevtools.stopDevServer('adminFspecApp')
}
