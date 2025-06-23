import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    dir: './spec/features',
    globals: true,
    setupFiles: ['luxon-jest-matchers', './spec/features/setup/hooks.js'],
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
    testTimeout: process.env.HEADLESS === '0' ? 40000 : 15000,

    globalSetup: './spec/features/setup/globalSetup.js',
  },
})
