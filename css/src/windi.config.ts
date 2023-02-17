import { defineConfig } from 'windicss/helpers'
// @ts-ignore
import PluginInteractionVariants from '@windicss/plugin-interaction-variants'
import PluginFilters from 'windicss/plugin/filters'
import theme from './theme.config'
import { IconDuotoneColorsPlugin } from './wc-icon-plugins'
import DetailsOpenVariantPlugin from './wc-details-open-variant-plugin'
import { shortcuts } from './shortcuts'
import { IconExtractor } from './wc-icon-extractor'

// give the plugins a name for debugging purposes
PluginInteractionVariants.config = { name: 'windi-interaction-variants' }
PluginFilters.config = { name: 'windi-filters' }

export default defineConfig({
  // This adds !important to all utility classes.
  // https://csswizardry.com/2016/05/the-importance-of-important/
  important: true,
  theme,
  plugins: [
    IconDuotoneColorsPlugin,
    PluginInteractionVariants,
    DetailsOpenVariantPlugin,
    PluginFilters,
  ],
  shortcuts,
  extract: {
    extractors: [IconExtractor],
  },
})
