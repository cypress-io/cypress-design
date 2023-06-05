import plugin from 'tailwindcss/plugin'

interface RecursiveKeyValuePair {
  [key: string]: string | RecursiveKeyValuePair
}

/**
 * Our default hover/focus behavior for buttons and cards is an indigo
 * border that hovers in and out
 * Animations not working? Border looking a little off? Make sure that you
 * have `border border-1` set on the non-hocus state. If you *don't* want a gray
 * outline with that, do border-transparent for the non-hocus state.
 */

export const tailwindPlugin = plugin(function ({
  addComponents,
  addUtilities,
  addBase,
  theme,
}) {
  function defaultRing(
    color: 'indigo' | 'error' | 'jade'
  ): RecursiveKeyValuePair {
    return {
      borderWidth: theme('borderWidth.DEFAULT'),
      borderColor: theme(`borderColor.${color}.300`),
      boxShadow: `0 0 0 2px ${theme(`colors.${color}.100`)}`,
      transition: 'all 150ms ease-in-out',
      outline: '2px solid transparent',
      ['&:disabled']: {
        boxShadow: 'none',
        borderColor: 'transparent',
      },
    }
  }

  function makeFocusDefaultObject(
    variants: Array<'focus' | 'hover' | 'focus-within'>,
    color: 'indigo' | 'error' | 'jade' = 'indigo'
  ): RecursiveKeyValuePair {
    return {
      outline: 'none',
      transition: 'all 150ms ease-in-out',
      [variants.map((variant) => `&:${variant}`).join(',')]: defaultRing(color),
    }
  }

  addComponents({
    '.card': {
      background: 'white',
      borderWidth: theme('borderWidth.DEFAULT'),
      borderStyle: 'solid',
      borderColor: theme('colors.gray.100'),
      borderRadius: theme('borderRadius.DEFAULT'),
      cursor: 'pointer',
      display: 'block',
      width: '100%',
      ...makeFocusDefaultObject(['hover', 'focus']),
    },
    '.default-ring': defaultRing('indigo'),
    '.hocus-within-default': makeFocusDefaultObject(['hover', 'focus-within']),
    '.hocus-default': makeFocusDefaultObject(['hover', 'focus']),
    '.focus-within-default': makeFocusDefaultObject(['focus-within']),
    '.focus-default': makeFocusDefaultObject(['focus']),
    '.hocus-link-default': {
      '&:focus': {
        outline: 'transparent',
        textDecoration: 'underline',
      },
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '.hocus-error': makeFocusDefaultObject(['hover', 'focus'], 'error'),
    '.hocus-secondary': makeFocusDefaultObject(['hover', 'focus'], 'jade'),
  })

  addUtilities({
    // utilities for modal
    '.cy-modal-overflow-hidden': {
      position: 'relative',
      overflow: 'hidden',
    },
    '.cy-modal-overflow-scroll-x': {
      overflowX: 'scroll',
    },
    '.cy-modal-overflow-scroll-y': {
      overflowY: 'scroll',
    },
  })

  addBase({
    '#modal-target': {
      position: 'absolute',
      top: '0',
      left: '0',
      zIndex: '1000000',
    },
  })
})
