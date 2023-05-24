const cypressCSS = require('@cypress-design/css')
const filePaths = [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}',
  '../../components/*/react/dist/*.@(js|css)',
]

// intended way
// module.exports = cypressCSS.TailwindConfig(filePaths)

// tailwind way\
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [cypressCSS.TailwindConfig()],
  content: {
    files: filePaths,
    extract: ['js', 'tsx'].reduce((acc, ext) => {
      acc[ext] = cypressCSS.TailwindIconExtractor
      return acc
    }, {}),
  },
}
