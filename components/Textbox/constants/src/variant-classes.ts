// Variant classes - structure: theme-type-state
// Light mode colors extracted from Figma
// Dark mode colors extracted from Figma (explicit, not auto-mapped)
export const CssVariantClasses = {
  // Light mode - Default type
  'light-default-default': [
    // Base styles
    'bg-white border-gray-100 text-gray-900',
    // Placeholder styles (when input shows placeholder)
    // Using :has() to detect when any descendant input has placeholder-shown
    // The has: variant targets descendants, so this should match input:placeholder-shown
    // Input element has text-inherit, so it will inherit this text color
    'has-[:placeholder-shown]:bg-gray-50 has-[:placeholder-shown]:placeholder-gray-900',
    // Hover styles
    'hover:border-gray-300',
    'hover:outline hover:outline-2 hover:outline-gray-300/25',

    // Active and focus styles
    'focus-within:border-indigo-300 focus-within:hover:border-indigo-300',
    'focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-0 focus-within:outline-indigo-300/35 focus-within:hover:outline-indigo-300/35 focus-within:hover:outline-[3px]',
    // Disabled styles
    'has-[:disabled]:bg-gray-50 has-[:disabled]:border-gray-50 has-[:disabled]:text-gray-500 has-[:disabled]:cursor-not-allowed',
    // Disable interactive states when disabled
    'has-[:disabled]:hover:border-gray-50 has-[:disabled]:hover:outline-none',
    'has-[:disabled]:focus-within:border-gray-50 has-[:disabled]:focus-within:outline-none',
  ].join(' '),

  // Light mode - Valid type
  'light-valid-default': [
    // Base styles
    'bg-white border-jade-300 text-jade-500',
    // Placeholder styles (when input shows placeholder)
    'has-[:placeholder-shown]:bg-gray-50',
    // Hover styles
    'hover:border-jade-300',
    'hover:outline hover:outline-2 hover:outline-jade-300/35',

    // Active and focus styles
    'focus-within:border-jade-400 focus-within:hover:border-jade-400',
    'focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-0 focus-within:outline-jade-300/35 focus-within:hover:outline-jade-300/35 focus-within:hover:outline-[3px]',
    // Disabled styles
    'has-[:disabled]:bg-gray-50 has-[:disabled]:border-gray-50 has-[:disabled]:text-gray-500 has-[:disabled]:cursor-not-allowed',
    // Disable interactive states when disabled
    'has-[:disabled]:hover:border-gray-50 has-[:disabled]:hover:outline-none',
    'has-[:disabled]:focus-within:border-gray-50 has-[:disabled]:focus-within:outline-none',
  ].join(' '),

  // Light mode - Invalid type
  'light-invalid-default': [
    // Base styles
    'bg-white border-red-300 text-red-500',
    // Placeholder styles (when input shows placeholder)
    'has-[:placeholder-shown]:bg-gray-50',
    // Hover styles
    'hover:border-red-300',
    'hover:outline hover:outline-2 hover:outline-red-300/35 hover:outline-offset-0',
    // Active and focus styles
    'focus-within:border-red-400 focus-within:hover:border-red-400',
    'focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-0 focus-within:outline-red-300/35 focus-within:hover:outline-red-300/35 focus-within:hover:outline-[3px]',
    // Disabled styles
    'has-[:disabled]:bg-gray-50 has-[:disabled]:border-gray-50 has-[:disabled]:text-gray-500 has-[:disabled]:cursor-not-allowed',
    // Disable interactive states when disabled
    'has-[:disabled]:hover:border-gray-50 has-[:disabled]:hover:outline-none',
    'has-[:disabled]:focus-within:border-gray-50 has-[:disabled]:focus-within:outline-none',
  ].join(' '),

  // Light mode - Warning type
  'light-warning-default': [
    // Base styles
    'bg-white border-orange-300 text-orange-600',
    // Placeholder styles (when input shows placeholder)
    'has-[:placeholder-shown]:bg-gray-50',
    // Hover styles
    'hover:border-orange-400',
    'hover:outline hover:outline-2 hover:outline-orange-300/35',
    // Active and focus styles
    'focus-within:border-orange-400 focus-within:hover:border-orange-400',
    'focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-0 focus-within:outline-orange-300/35 focus-within:hover:outline-orange-300/35 focus-within:hover:outline-[3px]',
    // Disabled styles
    'has-[:disabled]:bg-gray-50 has-[:disabled]:border-gray-50 has-[:disabled]:text-gray-500 has-[:disabled]:cursor-not-allowed',
    // Disable interactive states when disabled
    'has-[:disabled]:hover:border-gray-50 has-[:disabled]:hover:outline-none',
    'has-[:disabled]:focus-within:border-gray-50 has-[:disabled]:focus-within:outline-none',
  ].join(' '),

  // Dark mode - Default type (explicit colors from Figma)
  'dark-default-default': [
    // Base styles
    'bg-gray-950 border-gray-800 text-gray-300',
    // Placeholder styles (when input shows placeholder)
    'has-[:placeholder-shown]:bg-gray-900',
    // Hover styles
    'hover:border-gray-800',
    'hover:outline hover:outline-2 hover:outline-white/10',
    // Active and focus styles
    'focus-within:border-indigo-300 focus-within:hover:border-indigo-300',
    'focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-0 focus-within:outline-indigo-300/35 focus-within:hover:outline-indigo-300/35 focus-within:hover:outline-[3px]',
    // Disabled styles
    'has-[:disabled]:bg-gray-1000 has-[:disabled]:border-gray-900 has-[:disabled]:text-gray-700 has-[:disabled]:cursor-not-allowed',
    // Disable interactive states when disabled
    'has-[:disabled]:hover:border-gray-900 has-[:disabled]:hover:outline-none',
    'has-[:disabled]:focus-within:border-gray-900 has-[:disabled]:focus-within:outline-none',
  ].join(' '),

  // Dark mode - Valid type
  'dark-valid-default': [
    // Base styles
    'bg-gray-950 border-jade-300 text-jade-300',
    // Placeholder styles (when input shows placeholder)
    'has-[:placeholder-shown]:bg-gray-900',
    // Hover styles
    'hover:border-jade-300',
    'hover:outline hover:outline-2 hover:outline-jade-300/35',
    // Active and focus styles
    'focus-within:border-jade-300 focus-within:hover:border-jade-300',
    'focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-0 focus-within:outline-jade-300/35 focus-within:hover:outline-jade-300/35 focus-within:hover:outline-[3px]',
    // Disabled styles
    'has-[:disabled]:bg-gray-1000 has-[:disabled]:border-gray-900 has-[:disabled]:text-gray-700 has-[:disabled]:cursor-not-allowed',
    // Disable interactive states when disabled
    'has-[:disabled]:hover:border-gray-900 has-[:disabled]:hover:outline-none',
    'has-[:disabled]:focus-within:border-gray-900 has-[:disabled]:focus-within:outline-none',
  ].join(' '),

  // Dark mode - Invalid type
  'dark-invalid-default': [
    // Base styles
    'bg-gray-950 border-red-300 text-red-300',
    // Placeholder styles (when input shows placeholder)
    'has-[:placeholder-shown]:bg-gray-900',
    // Hover styles
    'hover:border-red-300',
    'hover:outline hover:outline-2 hover:outline-red-300/35',
    // Active and focus styles
    'focus-within:border-red-300 focus-within:hover:border-red-300',
    'focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-0 focus-within:outline-red-300/35 focus-within:hover:outline-red-300/35 focus-within:hover:outline-[3px]',
    // Disabled styles
    'has-[:disabled]:bg-gray-1000 has-[:disabled]:border-gray-900 has-[:disabled]:text-gray-700 has-[:disabled]:cursor-not-allowed',
    // Disable interactive states when disabled
    'has-[:disabled]:hover:border-gray-900 has-[:disabled]:hover:outline-none',
    'has-[:disabled]:focus-within:border-gray-900 has-[:disabled]:focus-within:outline-none',
  ].join(' '),

  // Dark mode - Warning type
  'dark-warning-default': [
    // Base styles
    'bg-gray-950 border-orange-300 text-orange-300',
    // Placeholder styles (when input shows placeholder)
    'has-[:placeholder-shown]:bg-gray-900',
    // Hover styles
    'hover:border-orange-300',
    'hover:outline hover:outline-2 hover:outline-orange-300/35',
    // Active and focus styles
    'focus-within:border-orange-300 focus-within:hover:border-orange-300',
    'focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-0 focus-within:outline-orange-300/35 focus-within:hover:outline-orange-300/35 focus-within:hover:outline-[3px]',
    // Disabled styles
    'has-[:disabled]:bg-gray-1000 has-[:disabled]:border-gray-900 has-[:disabled]:text-gray-700 has-[:disabled]:cursor-not-allowed',
    // Disable interactive states when disabled
    'has-[:disabled]:hover:border-gray-900 has-[:disabled]:hover:outline-none',
    'has-[:disabled]:focus-within:border-gray-900 has-[:disabled]:focus-within:outline-none',
  ].join(' '),
} as const
