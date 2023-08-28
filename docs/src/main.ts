import './assets/theme.css'
import './assets/markdown.scss'
import './assets/fonts/fonts.css'
import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import Tooltip from '@cypress-design/vue-tooltip'

import App from './App.vue'
import VueLiveWithLayout from './components/vue-live/vue-live.vue'
import DemoWrapper from './components/DemoWrapper.vue'
import generatedRoutes from '~pages'

const routes = setupLayouts(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
  },
  (ctx) => {
    ctx.app.component('VueLive', VueLiveWithLayout)
    ctx.app.component('Tooltip', Tooltip)
    ctx.app.component('DemoWrapper', DemoWrapper)
  },
)
