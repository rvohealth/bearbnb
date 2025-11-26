import { PsychicApp } from '@rvoh/psychic'
import { PsychicAppInitOptions } from '@rvoh/psychic/types'
import psychicConf from '../app.js'
import dreamConf from '../dream.js'

export default async function initializePsychicApp(opts: PsychicAppInitOptions = {}) {
  return await PsychicApp.init(psychicConf, dreamConf, opts)
}
