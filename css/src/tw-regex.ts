/**
 * @param {string|RegExp|Array<string|RegExp>} source
 */
function toSource(source: RegExp | string | (RegExp | string)[]) {
  const sourceArray = Array.isArray(source) ? source : [source]

  const sourceSrsArrays = sourceArray.map((item) =>
    item instanceof RegExp ? item.source : item,
  )

  return sourceSrsArrays.join('')
}

/**
 * @param {string|RegExp|Array<string|RegExp>} source
 */
export function pattern(source: RegExp | string | (RegExp | string)[]) {
  return new RegExp(toSource(source), 'g')
}

/**
 * @param {Array<string|RegExp>} sources
 */
export function any(sources: (RegExp | string)[]) {
  return `(?:${sources.map(toSource).join('|')})`
}

/**
 * @param {string|RegExp} source
 */
export function optional(source: RegExp | string) {
  return `(?:${toSource(source)})?`
}

/**
 * @param {string|RegExp|Array<string|RegExp>} source
 */
export function zeroOrMore(source: RegExp | string | (RegExp | string)[]) {
  return `(?:${toSource(source)})*`
}
