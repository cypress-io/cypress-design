import { defineConfig } from 'windicss/helpers'
// @ts-expect-error don't install types just for a test
import PluginInteractionVariants from '@windicss/plugin-interaction-variants'
import PluginFilters from 'windicss/plugin/filters'
import theme from '@cypress-design/css/dist/theme.config'
import { IconDuotoneColorsPlugin } from './wc-icon-plugins'
import DetailsOpenVariantPlugin from './wc-details-open-variant-plugin'
import { IconExtractor } from './wc-icon-extractor'

// give the plugins a name for debugging purposes
PluginInteractionVariants.config = { name: 'windi-interaction-variants' }
PluginFilters.config = { name: 'windi-filters' }

const focusDefault =
  'outline-none' +
  'focus:border focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 focus:outline-transparent' +
  'transition duration-150' +
  'disabled:hover:ring-0 disabled:hover:border-transparent'

// Usually what you want
const hocusDefault = focusDefault.replace(/focus:/g, 'hocus:')

// If you want to control a parent card when an inner button is in focus
const focusWithinDefault = focusDefault.replace(/focus:/g, 'focus-within:')

const shortcuts = {
  card:
    'bg-white border rounded cursor-pointer block border-gray-100 w-full ' +
    hocusDefault,
  'default-ring': focusDefault.replace(/focus:/g, ''),
  'hocus-within-default': focusDefault.replace(/focus:/g, 'hocus-within:'),
  'hocus-default': hocusDefault,
  'focus-within-default': focusWithinDefault,
  'focus-default': focusDefault,
  'hocus-link-default': 'focus:outline-transparent hocus:underline',
  'hocus-error': hocusDefault.replace(/indigo/g, 'error'),
  'hocus-secondary': hocusDefault.replace(/indigo/g, 'jade'),
}

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
