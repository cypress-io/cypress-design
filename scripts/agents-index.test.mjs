import { describe, it, expect } from 'vitest'
import { renderIndex } from './agents-index.mjs'

const docs = {
  'colors.md':
    '---\nname: colors\ndescription: Fetch when choosing colors.\n---\n',
  'principles/ux.md': '---\nname: ux\ndescription: \'The "what" side.\'\n---\n',
  'personas.md': '# Personas\n',
}
const readDoc = (path) => docs[path]

const index = (body) => `# Index\n\n## Pillars\n\n${body}\n\n## Components\n`

describe('renderIndex', () => {
  it('fills a list from frontmatter descriptions, in marker order', () => {
    const rendered = renderIndex(
      index('<!-- docs: principles/ux.md colors.md -->\n<!-- /docs -->'),
      readDoc,
    )
    expect(rendered).toBe(
      index(
        [
          '<!-- docs: principles/ux.md colors.md -->',
          '',
          '- [principles/ux.md](https://design.cypress.io/agents/principles/ux.md) — The "what" side.',
          '- [colors.md](https://design.cypress.io/agents/colors.md) — Fetch when choosing colors.',
          '',
          '<!-- /docs -->',
        ].join('\n'),
      ),
    )
  })

  it('replaces stale items and is stable on rerun', () => {
    const once = renderIndex(
      index(
        '<!-- docs: colors.md -->\n\n- [colors.md](x) — old text\n\n<!-- /docs -->',
      ),
      readDoc,
    )
    expect(once).not.toContain('old text')
    expect(renderIndex(once, readDoc)).toBe(once)
  })

  it('leaves content outside markers alone', () => {
    const text = index('- hand-written item')
    expect(renderIndex(text, readDoc)).toBe(text)
  })

  it('throws when a listed file has no description', () => {
    expect(() =>
      renderIndex(index('<!-- docs: personas.md -->\n<!-- /docs -->'), readDoc),
    ).toThrow(/personas\.md .* no frontmatter description/)
  })
})
