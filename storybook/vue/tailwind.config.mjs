// @ts-check
import { TailwindConfig, TailwindIconExtractor } from '@cypress-design/css'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [TailwindConfig()],
  content: {
    files: [
      './index.html',
      './stories/**/*.@(js|ts|tsx|mdx|vue)',
      '../../components/*/vue/dist/*.@(js|css)',
      '../../components/*/vue/**/*.@(mdx|tsx)',
    ],
    extract: ['vue', 'js', 'css', 'tsx', 'mdx'].reduce(
      (acc, ext) => ({ ...acc, [ext]: TailwindIconExtractor }),
      {}
    ),
  },
}
