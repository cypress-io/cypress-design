import type { Config } from 'tailwindcss'
import { tailwindPlugin } from './shortcuts'
import iconPlugin from './tw-icon-plugin'
import { IconExtractor } from './tw-icon-extractor'
import theme from './theme.config'
import detailsOpenVariantPlugin from './tw-details-open-variant-plugin'

function defineConfig(config: Config) {
  return config
}

export default (fileGlobs: string[] = []) => {
  return defineConfig({
    content: {
      files: fileGlobs,
      extract: ['vue', 'js', 'ts', 'tsx', 'astro'].reduce((acc, ext) => {
        acc[ext] = IconExtractor
        return acc
      }, {} as Record<string, (content: string) => string[]>),
    },
    theme,
    plugins: [tailwindPlugin, iconPlugin, detailsOpenVariantPlugin],
  })
}
