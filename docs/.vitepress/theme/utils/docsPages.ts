import { NavItemLink } from '@cypress-design/vue-docmenu'
import { Ref, computed } from 'vue'

const docsPages = import.meta.glob('../../../*.md')

export function getDocsPages(routePath: Ref<string>) {
  const routeMap = Object.keys(docsPages).reduce(
    (acc, p) => {
      const serverRoute = p.replace(/^\.\.\/\.\.\/\.\./, '')

      const clientRoute = serverRoute
        .replace(/\.md$/, '')
        .replace(/\/\d+-(\w)/g, '/$1')
        .replace(/Getting-Started$/, '')

      acc[clientRoute] = serverRoute
      return acc
    },
    {} as Record<string, string>,
  )

  const items = computed<NavItemLink[]>(() =>
    Object.keys(routeMap).map((clientRoute) => {
      return {
        label:
          clientRoute === '/'
            ? 'Getting Started'
            : clientRoute
                .split('/')
                .pop()
                ?.replace(/^\d+-(\w)/g, '$1')
                .replace(/-/g, ' ') ?? '',
        href: clientRoute,
        active:
          routePath.value.endsWith(`${clientRoute}.html`) ||
          (routePath.value === '/' && clientRoute === '/'),
      }
    }),
  )
  return { items, routeMap }
}
