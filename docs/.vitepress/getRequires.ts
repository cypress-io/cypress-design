import { getImports } from './getImports'

/**
 * Analyze code to find requires
 * put all requires into a "requires" object
 * add this as a prop
 * @param code
 * @param importMarker
 */
export function getRequires(
  code: string,
  importMarker: number,
  componentNames: string[],
  relativePath: string,
  production: boolean
) {
  // first if we find a local component we redirect it to the code to allow hot reload
  const imports = Object.entries(getImports(code)).filter(
    // since vue/react is automatically imported by vue-live we remove it
    (e) => !['react', 'vue'].includes(e[1].source)
  )

  return `${imports
    .map(([key, oneImport]) => {
      if (!oneImport.imported) {
        return ''
      }

      const localImport = production
        ? null
        : /^@cypress-design\/(vue|react)-(\w+)$/.exec(oneImport.source) &&
          /\/(vue|react)\/(\w+).md$/.exec(relativePath)
      const source = localImport
        ? `../../../components/${componentNames.find(
            (name) => name.toLowerCase() === localImport[2]
          )}/${localImport[1]}/index.ts`
        : oneImport.source
      return `import { ${oneImport.imported} as __imported_${key}_$${importMarker}__ } from '${source}';\n`
    })
    .join('')}
const imports$${importMarker} = {};
${imports
  .map(([key, oneImport]) => {
    if (!oneImport.imported) {
      return `imports$${importMarker}['${oneImport.source}'] = { __esModule:true, _: {} };`
    }
    return [
      `imports$${importMarker}['${oneImport.source}'] = imports$${importMarker}['${oneImport.source}'] ?? { __esModule:true, _: {} };`,
      `imports$${importMarker}['${oneImport.source}'].${oneImport.imported} = __imported_${key}_$${importMarker}__ ;`,
    ].join('')
  })
  .join('\n')}`
}
