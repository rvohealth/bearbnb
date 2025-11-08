import '@conf/loadEnv.js'

import AppEnv from '@conf/AppEnv.js'
import initializePsychicApp from '@conf/system/initializePsychicApp.js'
import { DreamCLI } from '@rvoh/dream/system'
import * as repl from 'node:repl'

const replServer = repl.start('> ')

export default (async function () {
  await initializePsychicApp()

  replServer.context.AppEnv = AppEnv

  await DreamCLI.loadRepl(replServer.context)
})()
