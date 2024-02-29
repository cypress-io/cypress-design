import plugin from 'tailwindcss/plugin'

export default plugin(
  ({ addVariant, addUtilities }) => {
    addUtilities({
      '.details-none::-webkit-details-marker': {
        display: 'none',
      },
    })

    addVariant('open', ['&[open]', 'details[open] &'])
  },
  { name: 'details-open-variant-plugin' },
)
