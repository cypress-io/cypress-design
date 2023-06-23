import { describe, it, expect } from 'vitest'
import { getHtmlAttributes, IconExtractor } from './tw-icon-extractor'

describe('getHtmlAttributes', () => {
  it('should return null if no attributes are found', () => {
    expect(getHtmlAttributes('<svg />')).toBe(null)
  })

  it('should return attributes if they are found', () => {
    expect(getHtmlAttributes('<svg fill="red" />')).toEqual({
      names: ['fill'],
      values: ['red'],
    })
  })

  it('should take care of isolated lines', () => {
    expect(getHtmlAttributes('fill="red"')).toEqual({
      names: ['fill'],
      values: ['red'],
    })
  })

  it('should take care of isolated lines with curlies', () => {
    expect(getHtmlAttributes("fill={'red'}")).toEqual({
      names: ['fill'],
      values: ['red'],
    })
  })
})

describe('IconExtractor', () => {
  it('should extract colors', () => {
    const ext = IconExtractor(
      '<wind-keep fillColor="red-300" strokeColor="indigo-800" />'
    )
    expect(ext).toContain('icon-light-red-300')
    expect(ext).toContain('icon-dark-indigo-800')
  })

  it('should extract colors in curlies', () => {
    const ext = IconExtractor(
      "<wind-keep fillColor={'red-300'} strokeColor={'indigo-800'} />"
    )
    expect(ext).toContain('icon-light-red-300')
    expect(ext).toContain('icon-dark-indigo-800')
  })
})
