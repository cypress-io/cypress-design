import { Ref, computed } from 'vue'

const componentDocsPages = import.meta.glob('../../../components/*/ReadMe.md')
const docsPages = import.meta.glob('../pages/*.md')

export function getDocsPages(routePath: Ref<string>) {
  const routeMapComponent = Object.keys(componentDocsPages).reduce(
    (acc, p) => {
      const serverRoute = p
        .replace(/^\.\.\/\.\.\/\.\./, '')
        .replace(/\/(\w+)\/ReadMe.md$/, '/$1.md')
        .toLowerCase()

      const clientRoute = serverRoute.replace(/\.md$/, '')

      ;['react', 'vue'].forEach((framework: string) => {
        const serverRouteComplete = serverRoute.replace(
          /\/components\//,
          `/components/${framework}/`,
        )
        acc[serverRouteComplete.replace(/\.md$/, '')] = clientRoute
      })

      return acc
    },
    {} as Record<string, string>,
  )

  const routeMap = Object.keys(docsPages).reduce((acc, p) => {
    const serverRoute = p.replace(/^\.\.\/pages/, '').toLowerCase()

    const clientRoute = serverRoute
      .replace(/\.md$/, '')
      .replace(/\/\d+-(\w)/g, '/$1')
      .replace(/Getting-Started$/, '')

    acc[clientRoute] = serverRoute
    return acc
  }, routeMapComponent)

  const items = computed(() =>
    Object.keys(routeMap).map((clientRoute) => {
      return {
        text:
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
