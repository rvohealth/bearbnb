import { PsychicApplication, PsychicApplicationInitOptions } from '@rvoh/psychic'
import { PsychicApplicationWebsockets } from '@rvoh/psychic-websockets'
import { PsychicApplicationWorkers } from '@rvoh/psychic-workers'
import psychicConf from './app.js'
import dreamConf from './dream.js'
import wsConf from './websockets.js'
import workersConf from './workers.js'

export default async function initializePsychicApplication(opts: PsychicApplicationInitOptions = {}) {
  const psychicApp = await PsychicApplication.init(psychicConf, dreamConf, opts)
  await PsychicApplicationWebsockets.init(psychicApp, wsConf)
  await PsychicApplicationWorkers.init(psychicApp, workersConf)
  return psychicApp
}
