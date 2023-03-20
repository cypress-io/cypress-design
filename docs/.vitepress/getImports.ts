import { parse } from '@vue/compiler-sfc'
import { transform } from 'sucrase'
import { parse as esParse } from 'es-module-lexer/js'

export function parseImports(code: string) {
  const [imports] = esParse(code)
  return imports.reduce(
    (
      acc,
      {
        ss: statementStartIndex,
        s: moduleSpecifierStartIndex,
        e: moduleSpecifierEndIndexExclusive,
        n: source,
      }
    ) => {
      if (source) {
        let importClauseString = code
          .substring(
            statementStartIndex + `import`.length,
            moduleSpecifierStartIndex - 1
          )
          .trim()

        if (importClauseString.endsWith(`from`)) {
          importClauseString = importClauseString.substring(
            0,
            importClauseString.length - `from`.length
          )
        } else {
          const source = code.substring(
            moduleSpecifierStartIndex,
            moduleSpecifierEndIndexExclusive
          )
          acc[source] = {
            source,
          }
        }

        const { defaultImport, namedImports } =
          parseImportClause(importClauseString)

        namedImports.forEach(({ imported, alias }) => {
          acc[alias] = {
            source,
            imported,
          }
        })

        if (defaultImport) {
          acc[defaultImport] = {
            source,
            imported: 'default',
          }
        }
      }
      return acc
    },
    {} as Record<string, { source: string; imported?: string }>
  )
}

function parseImportClause(importClauseString: string) {
  const defaultImport = parseDefaultImport(importClauseString)
  const namedImports = parseNamedImports(importClauseString)
  return { defaultImport, namedImports }
}

function parseDefaultImport(importClauseString: string) {
  const defaultImport = importClauseString.match(/^[a-zA-Z0-9_]+/)
  return defaultImport ? defaultImport[0] : null
}

function parseNamedImports(importClauseString: string) {
  // find first { and last }
  const firstCurly = importClauseString.indexOf('{')
  const lastCurly = importClauseString.lastIndexOf('}')

  const namedImports = importClauseString
    .slice(firstCurly, lastCurly)
    .matchAll(/([a-zA-Z0-9_]+)(?:\s+as\s+([a-zA-Z0-9_]+))?/g)
  return Array.from(namedImports).map(([_, imported, alias]) => ({
    imported,
    alias: alias || imported,
  }))
}

export const getImports = (
  code: string
): Record<string, { source: string; imported?: string }> => {
  if (/<\/script>/.test(code)) {
    const { descriptor, errors } = parse(code)

    if (errors.length) {
      console.error(errors)
    }

    if (descriptor?.script || descriptor?.scriptSetup) {
      return parseImports(
        descriptor?.script?.content ??
          '' + '\n' + descriptor?.scriptSetup?.content ??
          ''
      )
    }
  } else {
    try {
      const finalCode = transform(code, {
        transforms: ['typescript', 'jsx'],
      }).code

      return parseImports(finalCode)
    } catch (e) {
      // eat the compile or parse error
    }
  }
  return {}
}
