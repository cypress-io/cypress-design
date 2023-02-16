import type { Plugin } from 'vite'
import {
  applyExtractors,
  createUtils,
  getDefaultExtractors,
} from 'vite-plugin-windicss'
import { IconExtractor } from './icon-extractor'
import windiConfig from './windi.config'

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
    async transform(code, id) {
      if (/\.(vue|jsx|tsx|ts)$/.test(id)) {
        // extract all potential classes from the file
        const { classes } = await applyExtractors(code, id, [
          ...getDefaultExtractors(),
          IconExtractor,
        ])
        // Add all potential windi class names to the set
        classes?.forEach((className) => classSet.add(className))
      }
    },
    async generateBundle(options, bundle) {
      const chunk = bundle[Object.keys(bundle)[0]]
      // filter only the valid classes for the current processor
      await utils.ensureInit()
      const { success } = utils.processor.interpret([...classSet].join(' '))
      if (chunk?.type === 'chunk') {
        chunk.code += `\n/* <windicss-keep class="${success.join(' ')}"> */\n`
      }
    },
  }
}
