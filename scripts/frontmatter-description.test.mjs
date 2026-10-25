import { describe, it, expect } from 'vitest'
import { frontmatterDescription } from './frontmatter-description.mjs'

const doc = (description) =>
  `---\nname: colors\ndescription: ${description}\n---\n\n# Colors\n`

describe('frontmatterDescription', () => {
  it('reads a plain value', () => {
    expect(frontmatterDescription(doc('Fetch when choosing colors.'))).toBe(
      'Fetch when choosing colors.',
    )
  })

  it('unquotes a single-quoted value, including escaped quotes', () => {
    expect(
      frontmatterDescription(doc(`'The "what" side — it''s for UX.'`)),
    ).toBe(`The "what" side — it's for UX.`)
  })

  it('unquotes a double-quoted value', () => {
    expect(frontmatterDescription(doc('"Use the \\"index\\" first."'))).toBe(
      'Use the "index" first.',
    )
  })

  it('returns undefined without frontmatter or a description', () => {
    expect(
      frontmatterDescription('# Button\n\ndescription: not frontmatter'),
    ).toBe(undefined)
    expect(frontmatterDescription('---\nname: index\n---\n')).toBe(undefined)
  })

  it('ignores a description key in the body', () => {
    expect(
      frontmatterDescription('---\nname: x\n---\n\ndescription: body text\n'),
    ).toBe(undefined)
  })

  it('throws on a block scalar it would otherwise drop', () => {
    expect(() => frontmatterDescription(doc('>\n  Folded text'))).toThrow(
      /single-line/,
    )
  })
})
