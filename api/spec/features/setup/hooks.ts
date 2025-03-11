import '../../../src/conf/global'

import { DreamApplication } from '@rvoh/dream'
import { provideDreamViteMatchers, truncate } from '@rvoh/dream-spec-helpers'
import { PsychicServer } from '@rvoh/psychic'
import { providePuppeteerViteMatchers } from '@rvoh/psychic-spec-helpers'
import initializePsychicApplication from '../../../src/conf/initializePsychicApplication'

provideDreamViteMatchers()
providePuppeteerViteMatchers()

let server: PsychicServer

beforeEach(async () => {
  try {
    await initializePsychicApplication()
  } catch (err) {
    console.error(err)
    throw err
  }

  server = new PsychicServer()
  await server.start(parseInt(process.env.DEV_SERVER_PORT || '7778'))

  await truncate(DreamApplication)
}, 50000)

afterEach(async () => {
  await server.stop({ bypassClosingDbConnections: true })
})
