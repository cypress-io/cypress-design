const AGENTS = 'https://design.cypress.io/agents/'
const REPO = 'https://github.com/cypress-io/cypress-design/blob/main/'

/**
 * Map a served agent-doc URL to where a person reading the docs site should go.
 * Component docs are written for agents in other repos, so their links point at
 * the raw markdown under /agents/; on the site the same files render as pages.
 * Returns the URL unchanged when there's no human-facing equivalent.
 */
export function humanUrlFor(url) {
  if (!url.startsWith(AGENTS)) return url
  const [path, hash = ''] = url.slice(AGENTS.length).split('#')
  const anchor = hash ? `#${hash}` : ''

  let match = path.match(/^components\/([^/]+)\/instructions\.md$/)
  if (match) return `/components/${match[1]}${anchor}`

  match = path.match(/^components\/([^/]+)\/(react|vue)\/ReadMe\.md$/)
  if (match) return `/components/${match[1]}?fw=${match[2]}`

  // Contributor notes aren't rendered on the site; send people to the source.
  match = path.match(/^components\/([^/]+)\/architecture\.md$/)
  if (match) return `${REPO}components/${match[1]}/architecture.md${anchor}`

  if (path === 'colors.md') return `/colors${anchor}`

  return url
}

/** Rewrite agent-doc links in rendered markdown to their docs-site pages. */
export function remarkAgentLinks() {
  return (tree) => {
    function visit(node) {
      if ((node.type === 'link' || node.type === 'definition') && node.url) {
        node.url = humanUrlFor(node.url)
      }
      if (node.children) node.children.forEach(visit)
    }
    visit(tree)
  }
}
