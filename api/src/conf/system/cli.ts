#!/usr/bin/env node

// nice reference for shell commands:
// https://www.freecodecamp.org/news/node-js-child-processes-everything-you-need-to-know-e69498fe970a/
// commanderjs docs:
// https://github.com/tj/commander.js#quick-start

import '../loadEnv.js'

import { PsychicCLI } from '@rvoh/psychic/system'
import { Command } from 'commander'
import * as fs from 'node:fs'
import * as path from 'node:path'
import seedDb from '../../db/seed.js'
import initializePsychicApp from './initializePsychicApp.js'

const program = new Command()

PsychicCLI.provide(program, {
  initializePsychicApp,
  seedDb,
})

const AI_RULES_URL =
  'https://raw.githubusercontent.com/rvohealth/create-psychic/refs/heads/main/boilerplate/api/AGENTS.md'

program
  .command('sync:ai-rules')
  .description('syncs the latest AGENTS.md, preserving custom rules added at the bottom of the local file')
  .action(async () => {
    const rules = await (await fetch(AI_RULES_URL)).text()
    const targetPath = path.join(process.cwd(), 'AGENTS.md')
    const originalCurrentFileContents = fs.existsSync(targetPath)
      ? fs.readFileSync(targetPath).toString()
      : ''
    const currentFileContents = originalCurrentFileContents.split(`\
//////////////////////////////////////////////
// end:OFFICIAL PSYCHIC RULES DO NOT MODIFY //
//////////////////////////////////////////////
`)
    const customRules = currentFileContents.length > 1 ? currentFileContents.at(-1)! : ''
    fs.writeFileSync(targetPath, rules + customRules)

    process.exit()
  })

program.parse(process.argv)
