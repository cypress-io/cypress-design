import { defineConfig } from 'windicss/helpers';
// @ts-ignore
import InteractionVariants from '@windicss/plugin-interaction-variants';
import { IconDuotoneColorsPlugin, IconExtractor } from './icon-color-plugins';
import { colors } from './colors';
import { shortcuts } from './shortcuts';

export default defineConfig({
  // This adds !important to all utility classes.
  // https://csswizardry.com/2016/05/the-importance-of-important/
  important: true,
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: '4px',
        md: '4px',
      },
      fontFamily: {
        mono: '"Fira Code", monospace',
      },
      colors,
      cursor: {
        'ew-resize': 'ew-resize',
      },
      boxShadow: {
        dropdown: '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
        'marketing-card': '0 2px 12px 0 rgba(0, 0, 0, 0.06)',
      },
    },
  },
  variants: {
    // What's hocus?
    // Hocus is a portmanteau of hover + focus. This is useful because
    // many of our styles are the same for both hover and focus.
    backgroundColor: [
      'group-focus-within',
      'group-focus-visible',
      'group-active',
      'group-visited',
      'group-disabled',
      'hocus',
      'group-hocus',
      'can-hover',
      'no-hover',
    ],
  },
  plugins: [
    IconDuotoneColorsPlugin,
    InteractionVariants,
    require('windicss/plugin/filters'),
  ],
  shortcuts,
  extract: {
    exclude: ['node_modules/**/*', '.git/**/*'],
    extractors: [IconExtractor],
  },
});
