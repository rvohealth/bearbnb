import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    dir: './spec/unit',
    globals: true,
    setupFiles: ['luxon-jest-matchers', './spec/unit/setup/hooks.ts'],
    fileParallelism: false,
    maxConcurrency: 1,
    maxWorkers: 1,
    minWorkers: 1,
    watch: false,
    mockReset: true,
    clearMocks: true,
    restoreMocks: true,
    printConsoleTrace: true,
    hookTimeout: 20000,
    testTimeout: 20000,

    globalSetup: './spec/unit/setup/globalSetup.ts',
  },
})
