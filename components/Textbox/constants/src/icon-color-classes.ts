// Icon color classes - structure: theme-variant-state
// Icon color classes extracted from Figma design, converted to CSS classes
// These classes are applied to icon elements via className prop
export const CssIconColorClasses = {
  // Light mode - Default type
  'light-default-default': [
    'shrink-0', // Prevent flex shrinking
    'group-hover:icon-dark-indigo-500 group-hover:icon-light-indigo-200', // hover
    'group-focus-within:icon-dark-indigo-500 group-focus-within:icon-light-indigo-200', // focus
    'group-active:icon-dark-indigo-500 group-active:icon-light-indigo-200', // active
    'group-has-[:placeholder-shown]:icon-dark-gray-500 group-has-[:placeholder-shown]:icon-light-gray-50', // placeholder
    // Icons
    'icon-dark-gray-500 icon-light-gray-50', // base
    'group-has-[:disabled]:icon-dark-gray-400 group-has-[:disabled]:icon-light-indigo-50',
  ].join(' '),

  // Light mode - Valid type
  'light-valid-default': [
    'shrink-0', // Prevent flex shrinking
    'group-hover:icon-dark-jade-500 group-hover:icon-light-jade-200', // hover
    'group-focus-within:icon-dark-jade-500 group-focus-within:icon-light-jade-200', // focus
    'group-active:icon-dark-jade-500 group-active:icon-light-jade-200', // active
    'group-has-[:placeholder-shown]:icon-dark-jade-500 group-has-[:placeholder-shown]:icon-light-jade-200', // placeholder
    // Icons
    'icon-dark-jade-500 icon-light-jade-200', // base
    'group-has-[:disabled]:icon-dark-gray-400 group-has-[:disabled]:icon-light-gray-50',
  ].join(' '),

  // Light mode - Invalid type
  'light-invalid-default': [
    'shrink-0', // Prevent flex shrinking
    'group-hover:icon-dark-red-500 group-hover:icon-light-red-200', // hover
    'group-focus-within:icon-dark-red-500 group-focus-within:icon-light-red-200', // focus
    'group-active:icon-dark-red-500 group-active:icon-light-red-200', // active
    'group-has-[:placeholder-shown]:icon-dark-red-500 group-has-[:placeholder-shown]:icon-light-red-200', // placeholder
    // Icons
    'icon-dark-red-500 icon-light-red-200', // base
    'group-has-[:disabled]:icon-dark-red-500 group-has-[:disabled]:icon-light-red-200',
  ].join(' '),

  // Light mode - Warning type
  'light-warning-default': [
    'shrink-0', // Prevent flex shrinking
    'group-hover:icon-dark-orange-500 group-hover:icon-light-orange-200', // hover
    'group-focus-within:icon-dark-orange-500 group-focus-within:icon-light-orange-200', // focus
    'group-active:icon-dark-orange-500 group-active:icon-light-orange-200', // active
    'group-has-[:placeholder-shown]:icon-dark-orange-500 group-has-[:placeholder-shown]:icon-light-orange-200', // placeholder
    // Icons
    'icon-dark-orange-500 icon-light-orange-200', // base
    'group-has-[:disabled]:icon-dark-gray-400 group-has-[:disabled]:icon-light-gray-50',
  ].join(' '),

  // Dark mode - Default type
  'dark-default-default': [
    'shrink-0', // Prevent flex shrinking
    'group-hover:icon-dark-indigo-300 group-hover:icon-light-indigo-500', // hover
    'group-focus-within:icon-dark-indigo-300 group-focus-within:icon-light-indigo-500', // focus
    'group-active:icon-dark-indigo-300 group-active:icon-light-indigo-500', // active
    'group-has-[:placeholder-shown]:icon-dark-gray-500 group-has-[:placeholder-shown]:icon-light-gray-800', // placeholder
    // Icons
    'icon-dark-gray-500 icon-light-gray-800', // base
    'group-has-[:disabled]:icon-dark-gray-600 group-has-[:disabled]:icon-light-gray-800',
  ].join(' '),

  // Dark mode - Valid type
  'dark-valid-default': [
    'shrink-0', // Prevent flex shrinking
    'group-hover:icon-dark-jade-300 group-hover:icon-light-jade-500', // hover
    'group-focus-within:icon-dark-jade-300 group-focus-within:icon-light-jade-500', // focus
    'group-active:icon-dark-jade-300 group-active:icon-light-jade-500', // active
    'group-has-[:placeholder-shown]:icon-dark-jade-300 group-has-[:placeholder-shown]:icon-light-jade-500', // placeholder
    // Icons
    'icon-dark-jade-300 icon-light-jade-500', // base
    'group-has-[:disabled]:icon-dark-gray-600 group-has-[:disabled]:icon-light-gray-800',
  ].join(' '),

  // Dark mode - Invalid type
  'dark-invalid-default': [
    'shrink-0', // Prevent flex shrinking
    'group-hover:icon-dark-red-300 group-hover:icon-light-red-500', // hover
    'group-focus-within:icon-dark-red-300 group-focus-within:icon-light-red-500', // focus
    'group-active:icon-dark-red-300 group-active:icon-light-red-500', // active
    'group-has-[:placeholder-shown]:icon-dark-red-300 group-has-[:placeholder-shown]:icon-light-red-500', // placeholder
    // Icons
    'icon-dark-red-300 icon-light-red-500', // base
    'group-has-[:disabled]:icon-dark-gray-600 group-has-[:disabled]:icon-light-gray-800',
  ].join(' '),

  // Dark mode - Warning type
  'dark-warning-default': [
    'shrink-0', // Prevent flex shrinking
    'group-hover:icon-dark-orange-300 group-hover:icon-light-orange-500', // hover
    'group-focus-within:icon-dark-orange-300 group-focus-within:icon-light-orange-500', // focus
    'group-active:icon-dark-orange-300 group-active:icon-light-orange-500', // active
    'group-has-[:placeholder-shown]:icon-dark-orange-300 group-has-[:placeholder-shown]:icon-light-orange-500', // placeholder
    // Icons
    'icon-dark-orange-300 icon-light-orange-500', // base (default state uses orange-400/transparent)
    'group-has-[:disabled]:icon-dark-gray-600 group-has-[:disabled]:icon-light-gray-800',
  ].join(' '),
} as const
