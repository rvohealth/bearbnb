import { loadRepl } from '@rvoh/dream'
import * as repl from 'node:repl'
import AppEnv from './AppEnv.js'
import initializePsychicApplication from './initializePsychicApplication.js'
import './loadEnv.js'

const replServer = repl.start('> ')

export default (async function () {
  await initializePsychicApplication()

  replServer.context.AppEnv = AppEnv

  loadRepl(replServer.context)
})()
