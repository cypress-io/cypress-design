import { NavItemLink, NavGroup } from '@cypress-design/vue-docmenu'
import { DefaultTheme } from 'vitepress/theme'

export function getHeaders(range: DefaultTheme.Config['outline']) {
  const headers = [...document.querySelectorAll('main h2,h3,h4,h5,h6')]
    .filter((el) => el.id && el.hasChildNodes())
    .map((el) => {
      const level = Number(el.tagName[1])
      return {
        text: serializeHeader(el),
        href: '#' + el.id,
        level,
        items: [],
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

export interface NavGroupExtended extends NavGroup {
  level: number
  items: (NavGroupExtended | NavItemLink)[]
}

export function resolveHeaders(
  headers: NavGroupExtended[],
  range?: DefaultTheme.Config['outline']
): NavGroupExtended[] {
  if (range === false) {
    return []
  }

  const levelsRange =
    (typeof range === 'object' && !Array.isArray(range)
      ? range.level
      : range) || 2

  const [high, low]: [number, number] =
    typeof levelsRange === 'number'
      ? [levelsRange, levelsRange]
      : levelsRange === 'deep'
      ? [2, 6]
      : levelsRange

  headers = headers.filter((h) => h.level >= high && h.level <= low)

  const ret: NavGroupExtended[] = []
  outer: for (let i = 0; i < headers.length; i++) {
    const cur = headers[i]
    if (i === 0) {
      ret.push(cur)
    } else {
      for (let j = i - 1; j >= 0; j--) {
        const prev = headers[j]
        if (prev.level < cur.level) {
          prev.items.push(cur)
          continue outer
        }
      }
      ret.push(cur)
    }
  }

  return ret
}
