import './loadEnv.js'

import { loadRepl } from '@rvoh/dream'
import * as repl from 'node:repl'
import AppEnv from './AppEnv.js'
import initializePsychicApp from './system/initializePsychicApp.js'

const replServer = repl.start('> ')

export default (async function () {
  await initializePsychicApp()

  replServer.context.AppEnv = AppEnv

  await loadRepl(replServer.context)
})()
