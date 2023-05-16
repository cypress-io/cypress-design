import type DefaultTheme from 'vitepress/theme'
import Tooltip from '@cypress-design/vue-tooltip'
import './theme.css'
import VueLiveWithLayout from './components/vue-live.vue'
import Layout from './components/Layout.vue'
import DemoWrapper from './components/DemoWrapper.vue'

export default {
  Layout: Layout as any,
  NotFound: (() => '404 - page not found') as any,
  enhanceApp({ app }) {
    app.component('VueLive', VueLiveWithLayout)
    app.component('Tooltip', Tooltip)
    app.component('DemoWrapper', DemoWrapper)
  },
} satisfies typeof DefaultTheme
