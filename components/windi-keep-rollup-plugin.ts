import type { Plugin } from 'vite'
import {
  applyExtractors,
  createUtils,
  getDefaultExtractors,
} from 'vite-plugin-windicss'
import { IconExtractor, windiConfig } from '@cypress-design/css'
import dedent from 'dedent'

export default function WindiKeepRollupPlugin(): Plugin {
  const classSet = new Set<string>()
  const utils = createUtils(
    {
      config: windiConfig,
    },
    {
      name: 'cypress-design:windicss-class-inliner',
    }
  )
  return {
    name: 'cypress-design:windicss-class-inliner',
    enforce: 'pre',
    apply: 'build',
    async configResolved(_config) {
      // viteConfig = _config
    },
    async transform(code, id) {
      if (id.endsWith('.vue') || id.endsWith('.jsx') || id.endsWith('.scss')) {
        // Add the windicss class names to the set
        const { classes } = await applyExtractors(code, id, [
          ...getDefaultExtractors(),
          IconExtractor,
        ])
        classes?.forEach((className) => classSet.add(className))
      }
    },
    async generateBundle(options, bundle) {
      const chunk = bundle[Object.keys(bundle)[0]]
      // filter only the valid classes for the current processor
      await utils.ensureInit()
      const { success } = utils.processor.interpret([...classSet].join(' '))
      if (chunk?.type === 'chunk') {
        chunk.code += dedent`
        /* <windicss-keep class="${success.join(' ')}"> */
        \n`
      }
    },
  }
}
