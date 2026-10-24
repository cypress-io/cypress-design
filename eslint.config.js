import path from 'node:path'
import globals from 'globals'
import js from '@eslint/js'
import typescriptParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import vue from 'eslint-plugin-vue'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import noOnlyTests from 'eslint-plugin-no-only-tests'
import reactHooksRaw from 'eslint-plugin-react-hooks'
import { fixupPluginRules } from '@eslint/compat'
import tailwind from 'eslint-plugin-tailwindcss'

const reactHooks = fixupPluginRules(reactHooksRaw)

// The docs site is only linted for Tailwind usage, so turn off the core rules
// that js.configs.recommended applies to every file.
const coreRulesOff = Object.fromEntries(
  Object.keys(js.configs.recommended.rules).map((rule) => [rule, 'off']),
)

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
    files: ['docs/src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      globals: globals.browser,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: coreRulesOff,
  },
  {
    files: ['docs/src/**/*.vue'],
    languageOptions: {
      parser: vueParser,
      globals: globals.browser,
      sourceType: 'module',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
      },
    },
    rules: coreRulesOff,
  },
  {
    files: [
      'components/*/react/*.tsx',
      'components/*/vue/*.{ts,tsx,vue}',
      'docs/src/**/*.{ts,tsx,vue}',
    ],
    plugins: { tailwindcss: tailwind },
    settings: {
      tailwindcss: {
        config: path.join(import.meta.dirname, 'tailwind.config.mjs'),
        callees: ['clsx', 'twMerge'],
        // Non-Tailwind hook classes: `chevron` and `icon` mark component
        // parts, `header-anchor` matches the heading anchors on docs pages
        whitelist: ['chevron', 'icon', 'header-anchor'],
      },
    },
    rules: {
      // prettier-plugin-tailwindcss owns class order
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/no-arbitrary-value': 'warn',
      'tailwindcss/no-custom-classname': 'warn',
    },
  },
  {
    // Tests pass made-up classes on purpose to check they reach the DOM
    files: [
      'components/*/{react,vue}/*.{cy,rootStory,rootstory}.tsx',
      'docs/src/**/*.cy.ts',
    ],
    rules: {
      'tailwindcss/no-custom-classname': 'off',
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
