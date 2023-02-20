import { describe, it, expect } from 'vitest'
import { getHtmlAttributes } from './tw-icon-extractor'

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
})
