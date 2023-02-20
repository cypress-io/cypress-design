import plugin from 'tailwindcss/plugin'

interface RecursiveKeyValuePair {
  [key: string]: string | RecursiveKeyValuePair
}

/**
 * Our default hover/focus behavior for buttons and cards is an indigo
 * border that hovers in and out
 * Animations not working? Border looking a little off? Make sure that you
 * have border-1 set on the non-hocus state. If you *don't* want a gray
 * outline with that, do border-transparent for the non-hocus state.
 */

export const tailwindPlugin = plugin(function ({ addComponents, theme }) {
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
})

const focusDefault =
  'outline-none' +
  'focus:border focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 focus:outline-transparent' +
  'transition duration-150' +
  'disabled:hover:ring-0 disabled:hover:border-transparent'

// Usually what you want
const hocusDefault = focusDefault.replace(/focus:/g, 'hocus:')

// If you want to control a parent card when an inner button is in focus
const focusWithinDefault = focusDefault.replace(/focus:/g, 'focus-within:')

export const shortcuts = {
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
