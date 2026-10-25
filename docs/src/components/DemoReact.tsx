import React, { Suspense, lazy, useEffect, useRef, useState } from 'react'

// React counterpart to Demo.vue. `name` is the tile's path under
// docs/src/demos/, minus the extension (e.g. 'Select/react/Default', or
// 'SpecResults/AllStates' for a React-only all-states gallery).
// Mounted with `client:only="react"`, so each tile is its own island.
const demoLoaders = import.meta.glob<{ default: React.ComponentType }>([
  '../demos/*/react/*.tsx',
  '../demos/*/AllStates.tsx',
])

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
  const root = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  // Same as Demo.vue: mount only once on (or near) screen, so demos in the
  // hidden framework section don't load or measure themselves while hidden.
  useEffect(() => {
    const el = root.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (!Demo) return null
  return (
    <div ref={root} style={{ minHeight: 1 }}>
      {visible && (
        <Suspense fallback={null}>
          <Demo />
        </Suspense>
      )}
    </div>
  )
}
