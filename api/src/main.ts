import './conf/global'

import { PsychicServer } from '@rvoh/psychic'
import initializePsychicApplication from './conf/initializePsychicApplication'

async function start() {
  await initializePsychicApplication()

  const server = new PsychicServer()
  await server.start()
}

void start()
