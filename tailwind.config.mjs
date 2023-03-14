// @ts-check
import { TailwindConfig, TailwindIconExtractor } from '@cypress-design/css'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [TailwindConfig()],
  content: {
    files: [
      './components/**/*.@(tsx|vue|ts|scss|js|css)',
      './docs/.vitepress/**/*.vue',
      './docs/docgen/*.cjs',
      './docs/**/*.md',
    ],
    extract: ['vue', 'jsx', 'tsx', 'ts'].reduce(
      (acc, ext) => ({ ...acc, [ext]: TailwindIconExtractor }),
      {}
    ),
  },
}
