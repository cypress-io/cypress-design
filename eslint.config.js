import globals from 'globals'
import js from '@eslint/js'
import typescriptParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import vue from 'eslint-plugin-vue'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import noOnlyTests from 'eslint-plugin-no-only-tests'
import reactHooksRaw from 'eslint-plugin-react-hooks'
import { fixupPluginRules } from '@eslint/compat'

const reactHooks = fixupPluginRules(reactHooksRaw)

const config = [
  js.configs.recommended,
  {
    files: [
      'icon-registry/**/*.js',
      'docs/docgen/*.cjs',
      'components/**/generate-icons.js',
    ],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
    },
  },
  {
    files: ['scripts/**/*', '**/rollup.config.{mjs,js}', '**/vite.config.ts'],
    languageOptions: {
      parser: typescriptParser,
      globals: globals.node,
    },
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['**/*.mjs'],
    languageOptions: {
      parser: typescriptParser,
      globals: globals.node,
    },
  },
  {
    files: ['packages/eslint-plugin/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: [
      '{packages,css,icon-registry}/**/*.{test,cy}.{ts,tsx}',
      '{packages,css,icon-registry}/**/testUtils.ts',
    ],
    languageOptions: {
      parser: typescriptParser,
      globals: globals.node,
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    plugins: { '@typescript-eslint': typescriptEslint },
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['{packages,css,icon-registry}/**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      globals: { ...globals.node, ...globals.browser },
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    plugins: { '@typescript-eslint': typescriptEslint },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      'no-console': 'error',
      'no-debugger': 'error',
    },
  },

  {
    files: ['components/*/react/*.{cy,rootStory,rootstory}.tsx'],
    languageOptions: {
      parser: typescriptParser,
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.mocha,
        ...globals.chai,
        expect: 'readonly',
        cy: 'readonly',
        Cypress: 'readonly',
      },
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.react.json'],
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'react-hooks': reactHooks,
      'no-only-tests': noOnlyTests,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...reactHooksRaw.configs.recommended.rules,
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-only-tests/no-only-tests': 'error',
    },
  },
  {
    files: ['components/*/react/*.tsx'],
    ignores: ['components/*/react/*.{cy,rootStory,rootstory}.tsx'],
    languageOptions: {
      parser: typescriptParser,
      globals: globals.browser,
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.react.json'],
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'react-hooks': reactHooks,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...reactHooksRaw.configs.recommended.rules,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    files: ['components/*/vue/*.{ts,tsx,vue}'],
    ignores: ['components/*/vue/*.{cy,rootStory,rootstory}.tsx'],
    languageOptions: {
      parser: vueParser,
      globals: globals.browser,
      sourceType: 'module',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
        project: ['./tsconfig.vue.json', './tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      vue,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...vue.configs.recommended.rules,
      'no-console': 'error',
      'no-debugger': 'error',
    },
  },
  {
    files: ['components/*/vue/*.{cy,rootStory,rootstory}.tsx'],
    languageOptions: {
      parser: vueParser,
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.mocha,
        ...globals.chai,
        expect: 'readonly',
        cy: 'readonly',
        Cypress: 'readonly',
      },
      sourceType: 'module',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
        project: ['./tsconfig.vue.json', './tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'no-only-tests': noOnlyTests,
      vue,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...vue.configs.recommended.rules,
      'no-only-tests/no-only-tests': 'error',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
  {
    ignores: [
      '**/dist/**/*',
      '**/cache/**/*',
      '**/iconsData/**/*',
      '**/_TreeShakableIcons.ts',
      'icon-registry/src/icons.ts',
      'icon-registry/src/iconsList.ts',
    ],
  },
]

export default config
