import { Ref, computed } from 'vue'

const patternPages = import.meta.glob('../../../patterns/*.md')

export function getPatternPages(routePath: Ref<string>) {
  const routeMap = Object.keys(patternPages).reduce(
    (acc, p) => {
      const serverRoute = p.replace(/^\.\.\/\.\.\/\.\./, '')

      const clientRoute = serverRoute
        .replace(/\.md$/, '')
        .replace(/\/\d+-(\w)/g, '/$1')

      acc[clientRoute] = serverRoute
      return acc
    },
    {} as Record<string, string>,
  )

  const items = computed(() =>
    Object.keys(routeMap).map((clientRoute) => {
      return {
        text:
          clientRoute
            .split('/')
            .pop()
            ?.replace(/^\d+-(\w)/g, '$1')
            .replace(/-/g, ' ') ?? '',
        href: clientRoute,
        active: routePath.value.endsWith(`${clientRoute}.html`),
      }
    }),
  )
  return { items, routeMap }
}
