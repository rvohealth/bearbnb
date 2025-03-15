import '../../../src/conf/global.js'

import { DreamApplication } from '@rvoh/dream'
import { provideDreamViteMatchers, truncate } from '@rvoh/dream-spec-helpers'
import { providePuppeteerViteMatchers } from '@rvoh/psychic-spec-helpers'
import initializePsychicApplication from '../../../src/conf/initializePsychicApplication.js'
import getPage from './getPage.js'

provideDreamViteMatchers()
providePuppeteerViteMatchers()

// define global context variable, setting it equal to describe
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
;(global as any).context = describe

// this is done so that the `@jest-mock/express` library can continue
// to function. Since jest and vi have near parity, this seems to work,
// though it is very hacky, and we should eventually back out of it.
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
;(global as any).jest = vi

beforeAll(async () => {
  /*
   * initialize psychic
   *
   * provide your application code to psychic for initialization,
   * prior to launching your server.
   */
  try {
    await initializePsychicApplication()
  } catch (err) {
    console.error(err)
    throw err
  }

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
}, 50000)
