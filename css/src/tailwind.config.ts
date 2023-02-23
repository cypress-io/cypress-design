import * as path from 'path'
import type { Config } from 'tailwindcss'
import resolvePkg from 'resolve-pkg'
import { tailwindPlugin } from './shortcuts'
import iconPlugin from './tw-icon-plugin'
import { IconExtractor } from './tw-icon-extractor'
import theme from './theme.config'
import detailsOpenVariantPlugin from './tw-details-open-variant-plugin'

function defineConfig(config: Config) {
  return config
}

export default (fileGlobs: string[] = []) => {
  const currentPackagePath = resolvePkg('@cypress-design/css')

  if (currentPackagePath) {
    fileGlobs.push(
      path.resolve(
        currentPackagePath,
        '..', // remove css/ from path
        '*/dist/*.@(js|css)' // look for all component files
      )
    )
  }

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
