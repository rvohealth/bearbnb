import { loadRepl } from '@rvoh/dream'
import * as repl from 'node:repl'
import AppEnv from './AppEnv'
import initializePsychicApplication from './initializePsychicApplication'
import './loadEnv'

const replServer = repl.start('> ')

export default (async function () {
  await initializePsychicApplication()

  replServer.context.AppEnv = AppEnv

  loadRepl(replServer.context)
})()
