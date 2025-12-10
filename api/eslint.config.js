// @ts-check

import eslint from '@eslint/js'
import typescriptEslint from 'typescript-eslint'
import typescriptParser from '@typescript-eslint/parser'

const config = typescriptEslint.config(
  eslint.configs.recommended,
  typescriptEslint.configs.recommendedTypeChecked,

  {
    ignores: ['src/types/**/*.ts'],
  },

  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: { project: './tsconfig.json' },
    },
  },

  {
    rules: {
      // use PsychicApp.log or PsychicApp.logWithLevel instead of console.log, console.warn, etc...
      'no-console': 'error',
    },
  }
)
export default config
