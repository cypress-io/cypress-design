import type DefaultTheme from 'vitepress/theme'
import Tooltip from '@cypress-design/vue-tooltip'
import './theme.css'
import VueLiveWithLayout from './components/vue-live.vue'
import Layout from './components/Layout.vue'
import DemoWrapper from './components/DemoWrapper.vue'
import FigmaLink from './components/FigmaLink.vue'

export default {
  Layout: Layout as any,

  enhanceApp({ app }) {
    app.component('VueLive', VueLiveWithLayout)
    app.component('Tooltip', Tooltip)
    app.component('DemoWrapper', DemoWrapper)
    app.component('FigmaLink', FigmaLink)
  },
} satisfies typeof DefaultTheme
