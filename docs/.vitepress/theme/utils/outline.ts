import { NavItemLink, NavGroup } from '@cypress-design/vue-docmenu'

export function getHeaders(range: [number, number]) {
  const headers = [...document.querySelectorAll('main h2,main h3')]
    .filter((el) => el.id && el.hasChildNodes())
    .map((el) => {
      const level = Number(el.tagName[1])
      return {
        text: serializeHeader(el),
        href: '#' + el.id,
        level,
      }
    })

  return resolveHeaders(headers, range)
}

function serializeHeader(h: Element): string {
  let ret = ''
  for (const node of h.childNodes) {
    if (node.nodeType === 1) {
      if (
        (node as Element).classList.contains('VPBadge') ||
        (node as Element).classList.contains('header-anchor')
      ) {
        continue
      }
      ret += node.textContent
    } else if (node.nodeType === 3) {
      ret += node.textContent
    }
  }
  return ret.trim()
}

export interface NavLinkExtended extends NavItemLink {
  level: number
}

export function resolveHeaders(
  headers: NavLinkExtended[],
  range: [number, number] = [2, 3]
) {
  const [high, low] = range

  headers = headers.filter((h) => h.level >= high && h.level <= low)

  const ret: (NavGroup | NavItemLink)[] = []
  outer: for (let i = 0; i < headers.length; i++) {
    const cur = headers[i]
    if (i === 0) {
      ret.push(cur)
    } else {
      for (let j = i - 1; j >= 0; j--) {
        const prev = headers[j]
        if (prev.level < cur.level) {
          const prevGroup = prev as unknown as NavGroup
          if (!prevGroup.items) {
            prevGroup.items = []
          }
          prevGroup.items.push(cur)
          continue outer
        }
      }
      ret.push(cur)
    }
  }

  return ret
}
