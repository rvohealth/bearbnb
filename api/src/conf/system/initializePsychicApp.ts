import { PsychicApp, PsychicAppInitOptions } from '@rvoh/psychic'
import psychicConf from '../app.js'
import dreamConf from '../dream.js'

export default async function initializePsychicApp(opts: PsychicAppInitOptions = {}) {
  return await PsychicApp.init(psychicConf, dreamConf, opts)
}
