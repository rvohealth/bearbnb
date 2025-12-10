import '@conf/loadEnv.js'

import { PsychicDevtools } from '@rvoh/psychic/system'

export async function setup() {
  await PsychicDevtools.launchDevServer('clientFspecApp', { port: 3000, cmd: 'pnpm client:fspec' })
  await PsychicDevtools.launchDevServer('adminFspecApp', { port: 3001, cmd: 'pnpm admin:fspec' })
}

export function teardown() {
  PsychicDevtools.stopDevServer('clientFspecApp')
  PsychicDevtools.stopDevServer('adminFspecApp')
}
