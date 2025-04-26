import './conf/global.js'

import { PsychicServer } from '@rvoh/psychic'
import initializePsychicApp from './conf/system/initializePsychicApp.js'

async function start() {
  await initializePsychicApp()

  const server = new PsychicServer()
  await server.start()
}

void start()
