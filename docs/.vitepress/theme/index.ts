/// <reference types="vite/client" />

import DefaultTheme from 'vitepress/theme'
import 'tailwindcss/tailwind.css'
import './theme.css'
import VueLiveWithLayout from './components/vue-live.vue'
const modulesVue = import.meta.glob(
  '../../../components/*/vue/[A-Z]*.@(vue|ts)',
  { eager: true }
)
// const modulesReact = import.meta.glob('../../../components/*/react/[A-Z]*.@(tsx|ts)', { eager: true })

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('VueLive', VueLiveWithLayout)
    Object.entries(modulesVue).forEach(([filePath, mod]: [string, any]) => {
      const name =
        mod.default?.name ||
        mod.name ||
        filePath.split('/').pop()?.replace(/\..+$/, '')
      app.component(name, mod.default)
    })
  },
} satisfies typeof DefaultTheme
