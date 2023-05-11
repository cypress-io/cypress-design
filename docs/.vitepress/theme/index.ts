import type DefaultTheme from 'vitepress/theme'
import Tooltip from '@cypress-design/vue-tooltip'
import './theme.css'
import VueLiveWithLayout from './components/vue-live.vue'
import Layout from './components/Layout.vue'
import DemoWrapper from './components/DemoWrapper.vue'
import { defineComponent } from 'vue'

export default {
  Layout: Layout as any,
  NotFound: defineComponent(() => '404 - page not found'),
  enhanceApp({ app }) {
    app.component('VueLive', VueLiveWithLayout)
    app.component('Tooltip', Tooltip)
    app.component('DemoWrapper', DemoWrapper)
  },
} satisfies typeof DefaultTheme
