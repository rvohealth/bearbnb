import '@conf/loadEnv.js'

import AppEnv from '@conf/AppEnv.js'
import initializePsychicApp from '@conf/system/initializePsychicApp.js'
import { loadRepl } from '@rvoh/dream'
import * as repl from 'node:repl'

const replServer = repl.start('> ')

export default (async function () {
  await initializePsychicApp()

  replServer.context.AppEnv = AppEnv

  await loadRepl(replServer.context)
})()
