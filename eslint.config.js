import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import pluginVue from 'eslint-plugin-vue'
import pluginReactHooks from 'eslint-plugin-react-hooks'

export default [
  {
    name: 'global ignores',
    ignores: ['**/dist/**', '**/cache/**'],
  },
  {
    files: ['*.cjs'],
    languageOptions: {
      sourceType: 'script',
    },
  },
  {
    ...pluginJs.configs.recommended,
    files: ['*.mjs', '*.js'],
  },
  ...tseslint.configs.recommended,
  {
    name: 'react-components',
    files: ['components/*/react/*.{ts,tsx}'],
    plugins: {
      'typescript-eslint': tseslint.plugin,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
    },
    rules: {
      // ...pluginReact.configs.recommended.rules,
      // ...pluginReactHooks.configs.recommended.rules,
    },
  },
  {
    name: 'vue-components',
    files: ['components/*/vue/*.{ts,tsx,vue}'],
    plugins: {
      'typescript-eslint': tseslint.plugin,
      vue: pluginVue,
    },
    rules: {
      ...pluginVue.configs.recommended.rules,
    },
  },
]
