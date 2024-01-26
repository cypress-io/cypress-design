import * as path from 'path'
import type { Config } from 'tailwindcss'
import resolvePkg from 'resolve-pkg'
import { tailwindPlugin as shortcuts } from './shortcuts'
import iconPlugin from './tw-icon-plugin'
import { IconExtractor } from './tw-icon-extractor'
import theme from './theme.config'
import detailsOpenVariantPlugin from './tw-details-open-variant-plugin'
import plugin from 'tailwindcss/plugin'
import containerPlugin from '@tailwindcss/container-queries'

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
        '*/dist/*.@(js|css)', // look for all component files
      ),
    )
  }

  return defineConfig({
    content: {
      files: fileGlobs,
      extract: ['vue', 'js', 'ts', 'tsx', 'astro'].reduce(
        (acc, ext) => {
          acc[ext] = IconExtractor
          return acc
        },
        {} as Record<string, (content: string) => string[]>,
      ),
    },
    theme,
    plugins: [
      shortcuts,
      iconPlugin,
      detailsOpenVariantPlugin,
      containerPlugin,
      /**
       * hocus + group-hocus plugin
       */
      plugin(({ addVariant }) => {
        addVariant('hocus', ['&:focus', '&:hover'])
        addVariant('group-hocus', [
          ':merge(.group):focus &',
          ':merge(.group):hover &',
        ])
        addVariant('children', '& *')
      }),
      /**
       * add antialiased base for entire body
       */
      plugin(({ addBase }) => {
        addBase({
          body: {
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          },
        })
      }),
      plugin(({ addComponents }) => {
        addComponents({
          // to allow users to set custom width on buttons, we give it a width by default
          // if we don't set the button with by default, anchors will not have
          // the same size as buttons
          '.cy-button-width': {
            width: 'fit-content',
          },
        })
      }),
      containerPlugin,
    ],
  })
}
