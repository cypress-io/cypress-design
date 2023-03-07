import { parse, compileScript } from '@vue/compiler-sfc'
export const getImports = (code: string) => {
  const { descriptor } = parse(code)
  if (descriptor?.script || descriptor?.scriptSetup) {
    const script = compileScript(descriptor, { id: 'example.vue' })
    return script?.imports || []
  }
  return []
}
