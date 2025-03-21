import '../../../src/conf/global.js'

import { DreamApplication } from '@rvoh/dream'
import { provideDreamViteMatchers, truncate } from '@rvoh/dream-spec-helpers'
import initializePsychicApplication from '../../../src/conf/initializePsychicApplication.js'

provideDreamViteMatchers()

// define global context variable, setting it equal to describe
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
;(global as any).context = describe

beforeAll(async () => {
  await initializePsychicApplication()
})

beforeEach(async () => {
  await truncate(DreamApplication)
})
