import '../../../src/conf/global.js'

import { DreamApp } from '@rvoh/dream'
import { provideDreamViteMatchers, truncate } from '@rvoh/dream-spec-helpers'
import initializePsychicApp from '../../../src/conf/system/initializePsychicApp.js'

provideDreamViteMatchers()

// define global context variable, setting it equal to describe
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
;(global as any).context = describe

beforeAll(async () => {
  await initializePsychicApp()
})

beforeEach(async () => {
  await truncate(DreamApp)
})
