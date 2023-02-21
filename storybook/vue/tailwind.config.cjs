const cypressCSS = require('@cypress-design/css')

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [cypressCSS.TailwindConfig()],
  content: {
    files: [
      './index.html',
      './stories/**/*.@(js|ts|tsx|mdx|vue)',
      '../../components/*/vue/dist/*.@(js|css)',
      '../../components/*/vue/**/*.@(mdx|tsx)',
      '../../components/*/*.ts',
    ],
    extract: ['vue', 'js', 'css', 'tsx', 'mdx'].reduce(
      (acc, ext) => ({ ...acc, [ext]: cypressCSS.TailwindIconExtractor }),
      {}
    ),
  },
}
