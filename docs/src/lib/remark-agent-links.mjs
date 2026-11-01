const AGENTS = 'https://design.cypress.io/agents/'

/**
 * Map a served agent-doc URL to where a person reading the docs site should go.
 * Component docs are written for agents in other repos, so their links point at
 * the raw markdown under /agents/; on the site the same files render as pages.
 * Returns `null` for links that shouldn't appear on the site at all, and the URL
 * unchanged when there's no human-facing equivalent.
 */
export function humanUrlFor(url) {
  if (!url.startsWith(AGENTS)) return url
  const [path, hash = ''] = url.slice(AGENTS.length).split('#')
  const anchor = hash ? `#${hash}` : ''

  let match = path.match(/^components\/([^/]+)\/instructions\.md$/)
  if (match) return `/components/${match[1]}${anchor}`

  match = path.match(/^components\/([^/]+)\/(react|vue)\/ReadMe\.md$/)
  if (match) return `/components/${match[1]}?fw=${match[2]}`

  // Contributor notes are for people changing the component, not using it.
  if (/^components\/[^/]+\/architecture\.md$/.test(path)) return null

  if (path === 'colors.md') return `/colors${anchor}`

  return url
}

function textOf(node) {
  if (node.type === 'text' || node.type === 'inlineCode') return node.value
  return (node.children ?? []).map(textOf).join('')
}

// What's left of a paragraph once its only link is gone: nothing, or a bare
// lead-in label like "Implementation details:".
const LEFTOVER = /^\s*([^.:]*:)?\s*[.,;]?\s*$/

/**
 * Rewrite agent-doc links in rendered markdown to their docs-site pages, and
 * drop links that have no place on the site (with any label or list item they
 * would leave empty).
 */
export function remarkAgentLinks() {
  return (tree) => {
    // Returns true when `node` should be removed from its parent.
    function visit(node) {
      if ((node.type === 'link' || node.type === 'definition') && node.url) {
        const url = humanUrlFor(node.url)
        if (url === null) return true
        node.url = url
      }
      if (!node.children) return false

      const before = node.children.length
      node.children = node.children.filter((child) => !visit(child))
      const dropped = node.children.length < before

      if (dropped && node.type === 'paragraph') {
        return LEFTOVER.test(textOf(node))
      }
      if (node.type === 'listItem' || node.type === 'list') {
        return before > 0 && node.children.length === 0
      }
      return false
    }
    visit(tree)
  }
}
