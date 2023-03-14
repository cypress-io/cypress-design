import DefaultTheme from 'vitepress/theme'
import 'tailwindcss/tailwind.css'
import './theme.css'
import VueLiveWithLayout from './components/vue-live.vue'
import Layout from './components/Layout.vue'

export default {
  ...DefaultTheme,
  Layout: Layout as any,
  enhanceApp({ app }) {
    app.component('VueLive', VueLiveWithLayout)
  },
} satisfies typeof DefaultTheme
