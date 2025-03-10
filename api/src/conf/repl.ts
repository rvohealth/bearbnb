import './loadEnv'
import * as repl from 'node:repl'
import { loadRepl } from '@rvohealth/dream'
import initializePsychicApplication from './initializePsychicApplication'
import AppEnv from './AppEnv'

const replServer = repl.start('> ')

export default (async function () {
  await initializePsychicApplication()

  replServer.context.AppEnv = AppEnv

  loadRepl(replServer.context)
})()
