import '../../../src/conf/global.js'

import { PsychicServer } from '@rvoh/psychic'
import { DreamApplication } from '@rvoh/dream'
import { provideDreamViteMatchers, truncate } from '@rvoh/dream-spec-helpers'
import { providePuppeteerViteMatchers } from '@rvoh/psychic-spec-helpers'
import initializePsychicApplication from '../../../src/conf/initializePsychicApplication.js'
import getPage from './getPage.js'

provideDreamViteMatchers()
providePuppeteerViteMatchers()

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
;(global as any).context = describe

let server: PsychicServer

beforeAll(async () => {
  /*
   * initialize psychic
   *
   * provide your application code to psychic for initialization,
   * prior to launching your server.
   */
  await initializePsychicApplication()

  /*
   * start api server
   *
   * start your api server, so that your frontend client can drive through
   * it at http://localhost:7778
   */
  server = new PsychicServer()
  await server.start(parseInt(process.env.DEV_SERVER_PORT || '7778'))

  /*
   * Launch a web browser
   *
   * User puppeteer to launch a headless (or not, if you specify HEADLESS=0)
   * browser to drive through your front end client applications.
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  if (!(global as any).page) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    ;(global as any).page = await getPage()
  }
})

beforeEach(async () => {
  await truncate(DreamApplication)
})

afterAll(async () => {
  await server.stop()
})
