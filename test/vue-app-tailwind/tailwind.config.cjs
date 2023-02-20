const cypressCSS = require('@cypress-design/css')
const filePaths = [
  './index.html',
  './src/**/*.{vue,js,ts,jsx,tsx}',
  '../../components/*/vue/dist/*.@(js|css)',
]

// intended way
// module.exports = cypressCSS.TailwindConfig(filePaths)

// tailwind way\
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [cypressCSS.TailwindConfig()],
  content: {
    files: filePaths,
    extract: ['vue', 'js', 'tsx'].reduce((acc, ext) => {
      acc[ext] = cypressCSS.TailwindIconExtractor
      return acc
    }, {}),
  },
}
