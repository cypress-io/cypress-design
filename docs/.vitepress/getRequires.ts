import { getImports } from './getImports'

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

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
  componentNames: string[]
) {
  // first if we find a local component we redirect it to the code to allow hot reload
  const imports = Object.entries(getImports(code)).filter(
    // since vue is automatically imported by vue-live we remove it
    (e) => e[1].source !== 'vue'
  )

  return `${imports
    .map(([key, oneImport]) => {
      if (!oneImport.imported) {
        return ''
      }
      const localImport = /^@cypress-design\/(vue|react)-(\w+)$/.exec(
        oneImport.source
      )
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
