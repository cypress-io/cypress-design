import postcss from 'postcss'
import tailwindcss, { Config } from 'tailwindcss'

export function runTailwind(input: string, config: Config) {
  return postcss(tailwindcss(config) as any).process(input, {
    from: undefined,
  })
}
