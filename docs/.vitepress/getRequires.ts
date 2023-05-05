import { getImports } from './getImports'

/**
 * Analyze code to find requires
 * put all requires into a "requires" object
 * add this as a prop
 * @param code
 * @param importMarker
 */
export function getRequires(code: string, importMarker: number) {
  const imports = getImports(code)
  return `${Object.entries(imports)
    .map(([key, oneImport]) => {
      if (!oneImport.imported) {
        return ''
      }
      return `import { ${oneImport.imported} as __imported_${key}_$${importMarker}__ } from '${oneImport.source}';
			`
    })
    .join('')}
		const imports$${importMarker} = {}
		${Object.entries(imports)
      .map(([key, oneImport]) => {
        if (!oneImport.imported) {
          return `imports$${importMarker}['${oneImport.source}'] = { __esModule:true, _: {} };`
        }
        return [
          `imports$${importMarker}['${oneImport.source}'] = imports$${importMarker}['${oneImport.source}'] ?? { __esModule:true, _: {} };`,
          `imports$${importMarker}['${oneImport.source}'].${oneImport.imported} = __imported_${key}_$${importMarker}__ ;`,
        ].join('')
      })
      .join('')}`
}
