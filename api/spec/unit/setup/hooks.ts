import '@conf/loadEnv.js'

import initializePsychicApp from '@conf/system/initializePsychicApp.js'
import { Dream, DreamApp } from '@rvoh/dream'
import { provideDreamViteMatchers, truncate } from '@rvoh/dream-spec-helpers'

provideDreamViteMatchers(Dream)

// define global context variable, setting it equal to describe
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
;(global as any).context = describe

beforeAll(async () => {
  await initializePsychicApp()
})

beforeEach(async () => {
  await truncate(DreamApp)
})
