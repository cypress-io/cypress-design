import createPlugin from 'windicss/plugin'

export default createPlugin(
  ({ addVariant }) => {
    addVariant('open', ({ modifySelectors }) => {
      return modifySelectors(({ className }) => {
        return `.${className}[open], details[open] .${className}`
      })
    })
  },
  { name: 'details-open-variant-plugin' }
)
