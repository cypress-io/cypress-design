// @ts-check
import { TailwindConfig, TailwindIconExtractor } from '@cypress-design/css'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [TailwindConfig()],
  content: {
    files: ['./components/**/*.@(tsx|vue|ts|scss)'],
    extract: ['vue', 'js', 'css', 'tsx', 'mdx'].reduce(
      (acc, ext) => ({ ...acc, [ext]: TailwindIconExtractor }),
      {}
    ),
  },
}
