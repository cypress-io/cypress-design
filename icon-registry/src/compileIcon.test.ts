import { it, expect, describe } from 'vitest'
import { compileIcon } from './compileIcon'

describe('compileIcon', () => {
  it('should compile the body of the icon', () => {
    expect(
      compileIcon({
        name: 'object-book',
      }).body
    ).toMatchInlineSnapshot(
      '"<path fill=\\"#D0D2E0\\" d=\\"M13 2H4a1 1 0 0 0-1 1v8h10V2Z\\" class=\\"icon-light\\"/><path stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"2\\" d=\\"M13 11V2H4m9 9H4m9 0v3H4m-1-3v2a1 1 0 0 0 1 1v0m-1-3V3a1 1 0 0 1 1-1v0m-1 9h1m0-9v9m0 0v3m6-9H7\\" class=\\"icon-dark\\"/>"'
    )
  })

  it('should keep most props', () => {
    expect(
      compileIcon({
        hoverStrokeColor: 'red-500',
        name: 'object-book',
        size: '24',
        strokeColor: 'jade-500',
      })
    ).toMatchObject({
      hoverStrokeColor: 'red-500',
      size: '24',
      strokeColor: 'jade-500',
    })
  })

  it('should compile the needed classes', () => {
    expect(
      compileIcon({
        hoverStrokeColor: 'red-500',
        name: 'object-book',
        size: '24',
        strokeColor: 'jade-500',
      }).compiledClasses
    ).toMatchObject(['icon-hover:icon-dark-red-500', 'icon-dark-jade-500'])
  })

  it('should eliminate interactiveColorsOnGroup & class', () => {
    expect(
      compileIcon({
        hoverStrokeColor: 'red-500',
        name: 'object-book',
        size: '24',
        strokeColor: 'jade-500',
        interactiveColorsOnGroup: true,
      })
    ).not.toMatchObject({ interactiveColorsOnGroup: true })
  })
})
