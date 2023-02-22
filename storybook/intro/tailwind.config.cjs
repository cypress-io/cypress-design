const { TailwindConfig, TailwindIconExtractor } = require('@cypress-design/css')

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [TailwindConfig()],
  content: {
    files: ['./stories/**/*.@(ts|tsx|mdx)'],
    extract: ['jsx', 'tsx', 'mdx'].reduce(
      (acc, ext) => ({ ...acc, [ext]: TailwindIconExtractor }),
      {}
    ),
  },
  safelist: [],
}
