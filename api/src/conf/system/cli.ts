#!/usr/bin/env node

// nice reference for shell commands:
// https://www.freecodecamp.org/news/node-js-child-processes-everything-you-need-to-know-e69498fe970a/
// commanderjs docs:
// https://github.com/tj/commander.js#quick-start

import '../loadEnv.js'

import { PsychicCLI } from '@rvoh/psychic/system'
import { Argument, Command } from 'commander'
import * as fs from 'node:fs'
import * as path from 'node:path'
import seedDb from '../../db/seed.js'
import initializePsychicApp from './initializePsychicApp.js'

const program = new Command()

PsychicCLI.provide(program, {
  initializePsychicApp,
  seedDb,
})

const SUPPORTED_AI_ENUM_VALUES = ['cursor', 'copilot', 'claude'] as const
type SUPPORTED_AI_ENUM = (typeof SUPPORTED_AI_ENUM_VALUES)[number]
const AI_RULES_URL =
  'https://raw.githubusercontent.com/rvohealth/create-psychic/refs/heads/create-psychic/2.0/ai/rules'
const AI_FILE_MAP: Record<SUPPORTED_AI_ENUM, string> = {
  claude: 'CLAUDE.md',
  copilot: '.github/copilot-instructions.md',
  cursor: '.cursor/rules',
}

program
  .command('sync:ai-rules')
  .addArgument(new Argument('<target>', 'A.I. target').choices([...SUPPORTED_AI_ENUM_VALUES, 'all']))
  .description('syncs the ')
  .action(async (_target: SUPPORTED_AI_ENUM | 'all') => {
    const targets = _target === 'all' ? SUPPORTED_AI_ENUM_VALUES : [_target]
    for (const target of targets) {
      const rules = await (await fetch(AI_RULES_URL)).text()
      const targetPath = path.join(process.cwd(), AI_FILE_MAP[target])
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
    }

    process.exit()
  })

program.parse(process.argv)
