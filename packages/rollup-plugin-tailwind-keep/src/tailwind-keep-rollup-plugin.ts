import type { Plugin } from 'vite'
import { Context } from 'tailwindcss/lib/Context'
import { TailwindConfig, TailwindIconExtractor } from '@cypress-design/css'

export default function TailwindKeepRollupPlugin(): Plugin {
  const classSet = new Set<string>()
  let context: Context | undefined
  return {
    name: 'cypress-design:tailwind-class-inliner',
    enforce: 'pre',
    apply: 'build',
    async transform(code, id) {
      if (
        /\.(vue|jsx|tsx|ts)$/.test(id) ||
        /constants\/dist\/.+\.js$/.test(id)
      ) {
        // extract all potential classes from the file
        const candidates = TailwindIconExtractor(code)
        if (!context) {
          const { createContext } = await import(
            'tailwindcss/lib/lib/setupContextUtils.js'
          )

          const { default: resolveConfig } = await import(
            'tailwindcss/lib/public/resolve-config.js'
          )

          context = createContext(resolveConfig(TailwindConfig))
        }

        const { resolveMatches } = await import(
          'tailwindcss/lib/lib/generateRules.js'
        )

        // filter only the valid classes for the current processor
        candidates.forEach((c) => {
          if (!context) throw new Error('Context is not defined')
          const utilities = Array.from(resolveMatches(c, context))

          if (utilities.length) {
            classSet.add(c)
          }
        })
      }
    },
    async generateBundle(options, bundle) {
      const chunk = bundle[Object.keys(bundle)[0]]
      if (chunk?.type === 'chunk') {
        chunk.code += `\n/* <wind-keep class="${[...classSet].join(' ')}"> */\n`
      }
    },
  }
}
