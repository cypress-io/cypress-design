const cypressCSS = require('@cypress-design/css')

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [cypressCSS.TailwindConfig()],
  content: {
    files: [
      './index.html',
      './stories/**/*.@(ts|tsx|mdx)',
      '../../components/*/react/**/*.@(mdx|tsx|ts|css|js|jsx)',
    ],
    extract: ['jsx', 'tsx', 'mdx'].reduce(
      (acc, ext) => ({ ...acc, [ext]: cypressCSS.TailwindIconExtractor }),
      {}
    ),
  },
}
