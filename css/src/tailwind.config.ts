import type { Config } from 'tailwindcss'
import { tailwindPlugin } from './shortcuts'
import iconPlugin from './tw-icon-plugin'
import theme from './theme.config'

function defineConfig(config: Config['theme']) {
  return config
}

export default defineConfig({
  theme,
  plugins: [tailwindPlugin, iconPlugin],
})
