import React, { Suspense, lazy } from 'react'

// React counterpart to Demo.vue. `name` is the tile's path under
// docs/src/demos/, minus the extension (e.g. 'Select/react/Default').
// Mounted with `client:only="react"`, so each tile is its own island.
const demoLoaders = import.meta.glob<{ default: React.ComponentType }>(
  '../demos/*/react/*.tsx',
)

const demoMap: Record<
  string,
  React.LazyExoticComponent<React.ComponentType>
> = Object.fromEntries(
  Object.entries(demoLoaders).map(([path, loader]) => {
    const name = path.replace('../demos/', '').replace(/\.tsx$/, '')
    return [name, lazy(loader)]
  }),
)

export default function DemoReact({ name }: { name: string }) {
  const Demo = demoMap[name]
  if (!Demo) return null
  return (
    <Suspense fallback={null}>
      <Demo />
    </Suspense>
  )
}
