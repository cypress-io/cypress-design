import DefaultTheme from 'vitepress/theme'
import 'tailwindcss/tailwind.css'
import './theme.css'
import VueLiveWithLayout from './components/vue-live.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('VueLive', VueLiveWithLayout)
  },
} satisfies typeof DefaultTheme
