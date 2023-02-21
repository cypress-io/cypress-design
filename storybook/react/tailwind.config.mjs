// @ts-check
import { TailwindConfig, TailwindIconExtractor } from '@cypress-design/css'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [TailwindConfig()],
  content: {
    files: [
      './index.html',
      './stories/**/*.@(ts|tsx|mdx)',
      '../../components/*/react/**/*.@(mdx|tsx|ts|css|js|jsx)',
    ],
    extract: ['jsx', 'tsx', 'mdx'].reduce(
      (acc, ext) => ({ ...acc, [ext]: TailwindIconExtractor }),
      {}
    ),
  },
}
