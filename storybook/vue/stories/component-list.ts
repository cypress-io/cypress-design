const comps = import.meta.globEager('../../../components/*/vue/package.json')

export const capName = Object.keys(comps).reduce((acc, fullPath) => {
  const cleanComponentName = fullPath
    .replace('../../../components/', '')
    .replace('/vue/package.json', '')

  acc[cleanComponentName.toLowerCase()] = cleanComponentName

  return acc
}, {})

export default comps
