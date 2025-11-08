import '../../src/conf/loadEnv.js'

import { defineConfig } from 'vitest/config'
import srcPath from '../../src/conf/system/srcPath.js'

export default defineConfig({
  resolve: {
    alias: {
      '@conf': srcPath('conf'),
      '@controllers': srcPath('app', 'controllers'),
      '@models': srcPath('app', 'models'),
      '@serializers': srcPath('app', 'serializers'),
      '@services': srcPath('app', 'services'),
      '@spec': srcPath('..', 'spec'),
      '@src': srcPath(),
    },
  },
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
