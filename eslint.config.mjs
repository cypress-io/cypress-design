import tsESlint from 'typescript-eslint'
import vueEslintParser from 'vue-eslint-parser'
import noOnlyTest from 'eslint-plugin-no-only-tests'
import gitignore from 'eslint-config-flat-gitignore'

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
export default [
  gitignore(),
  {
    files: ['**/*.ts', '**/*.js'],
    ignores: [
      '**/dist',
      '**/docs/.vitepress/cache/**/*.js',
      '**/iconsData',
      '**/_TreeShakableIcons.ts',
      '**/icon-registry/src/icons.ts',
      '**/icon-registry/src/iconsList.ts',
    ],
    languageOptions: {
      parser: tsESlint.parser,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tsESlint.plugin,
      noOnlyTest,
    },
    rules: {
      'no-console': 'error',
      'no-debugger': 'error',
      'noOnlyTest/no-only-tests': 'error',
      'no-unused-vars': 'off',
      ...tsESlint.configs.recommended.rules,
    },
  },
]
