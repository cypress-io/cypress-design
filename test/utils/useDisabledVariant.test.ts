import { describe, it, expect } from 'vitest'
import { useDisabledVariant } from '../../components/Button/utils/useDisabledVariant'

describe('useDisabledVariant', () => {
  it('should keep original variant when not disabled', () => {
    expect(useDisabledVariant('red-dark', false)).toBe('red-dark')
    expect(useDisabledVariant('white', false)).toBe('white')
    expect(useDisabledVariant('outline-indigo', false)).toBe('outline-indigo')
  })

  it('should keep dark-mode variants when disabled', () => {
    expect(useDisabledVariant('red-dark-mode', true)).toBe('red-dark-mode')
    expect(useDisabledVariant('outline-red-dark-mode', true)).toBe(
      'outline-red-dark-mode',
    )
  })

  it('should keep outline variants when disabled', () => {
    expect(useDisabledVariant('outline-indigo', true)).toBe('outline-indigo')
    expect(useDisabledVariant('outline-red', true)).toBe('outline-red')
  })

  it('should keep white variant when disabled', () => {
    expect(useDisabledVariant('white', true)).toBe('white')
  })

  it('should use disabled variant for other variants when disabled', () => {
    expect(useDisabledVariant('indigo-dark', true)).toBe('disabled')
    expect(useDisabledVariant('jade-dark', true)).toBe('disabled')
  })

  it('should handle undefined variant', () => {
    expect(useDisabledVariant(undefined, true)).toBe('disabled')
    expect(useDisabledVariant(undefined, false)).toBe('disabled')
  })
})
