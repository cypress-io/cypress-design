import { parse, compileScript } from '@vue/compiler-sfc'
import { transform } from 'sucrase'
import parseImports from 'parse-static-imports'

export const getImports = (
  code: string
): Record<string, { source: string; imported: string }> => {
  if (/<\/script>/.test(code)) {
    const { descriptor, errors } = parse(code)

    if (errors.length) {
      console.error(errors)
    }

    if (descriptor?.script || descriptor?.scriptSetup) {
      const script = compileScript(descriptor, { id: 'example.vue' })
      return script?.imports || {}
    }
  } else {
    try {
      const finalCode = transform(code, {
        transforms: ['typescript', 'jsx'],
      }).code

      return parseImports(finalCode).reduce(
        (acc, { moduleName, namedImports }) => {
          namedImports.forEach(({ alias, name }) => {
            acc[alias] = {
              source: moduleName,
              imported: name,
            }
          })

          return acc
        },
        {} as Record<string, { source: string; imported: string }>
      )
    } catch (e) {
      // eat the compile or parse error
    }
  }
  return {}
}
