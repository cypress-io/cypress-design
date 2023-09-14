import type { Config } from 'tailwindcss'
import { colors } from './colors'

function defineTheme(theme: Config['theme']) {
  return theme
}

export default defineTheme({
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
      'ring-hover': '0 0 0 2px rgba(0, 0, 0, 0.2)',
      'ring-focus': '0 0 0 3px rgba(0, 0, 0, 0.2)',
      tooltip: '0 0 4px rgba(0, 0, 0, 0.25)',
    },
  },
})
