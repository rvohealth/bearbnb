import '@conf/loadEnv.js'

import initializePsychicApp from '@conf/system/initializePsychicApp.js'
import { PsychicServer } from '@rvoh/psychic'

async function start() {
  await initializePsychicApp()

  const server = new PsychicServer()
  await server.start()
}

void start()
