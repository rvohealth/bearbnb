import { PsychicApplication, PsychicApplicationInitOptions } from '@rvoh/psychic'
import { PsychicApplicationWebsockets } from '@rvoh/psychic-websockets'
import { PsychicApplicationWorkers } from '@rvoh/psychic-workers'
import psychicConf from './app'
import dreamConf from './dream'
import wsConf from './websockets'
import workersConf from './workers'

export default async function initializePsychicApplication(opts: PsychicApplicationInitOptions = {}) {
  const psychicApp = await PsychicApplication.init(psychicConf, dreamConf, opts)
  await PsychicApplicationWebsockets.init(psychicApp, wsConf)
  await PsychicApplicationWorkers.init(psychicApp, workersConf)
  return psychicApp
}
