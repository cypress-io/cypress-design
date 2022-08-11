import createPlugin from 'windicss/plugin'

export default createPlugin(
  ({ addVariant, addUtilities }) => {
    addUtilities({
      '.details-none::-webkit-details-marker': {
        display: 'none',
      },
    })
    addVariant('open', ({ modifySelectors }) => {
      return modifySelectors(({ className }) => {
        return `.${className}[open], details[open] .${className}`
      })
    })
  },
  { name: 'details-open-variant-plugin' }
)
