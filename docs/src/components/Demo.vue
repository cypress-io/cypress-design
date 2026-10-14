<script lang="ts" setup>
import { defineAsyncComponent, onBeforeUnmount, onMounted, ref } from 'vue'

// `name` is the demo's path under docs/src/demos/, minus the extension:
//   'Button'             → demos/Button.vue            (single-demo pages)
//   'Select/vue/Default' → demos/Select/vue/Default.vue (tiles)
//   'Select/AllStates'   → demos/Select/AllStates.vue  (all-states gallery)
defineProps<{ name: string }>()

// Lazy-load each demo so a single broken demo package doesn't block other
// pages — only the active demo gets imported at runtime.
const demoLoaders = import.meta.glob([
  '../demos/*.vue',
  '../demos/*/AllStates.vue',
  '../demos/*/vue/*.vue',
])

const demoMap: Record<string, any> = Object.fromEntries(
  Object.entries(demoLoaders).map(([path, loader]) => {
    const name = path.replace('../demos/', '').replace(/\.vue$/, '')
    return [name, defineAsyncComponent(loader as any)]
  }),
)

// Mount the demo only once it's on (or near) screen. The inactive framework
// section is `display: none`, which never intersects, so its demos wait until
// that tab is chosen — and components that measure themselves on mount (Tabs,
// DocMenu) measure a visible layout instead of zeros. The wrapper keeps 1px
// of height: a zero-height target isn't reliably reported as intersecting.
const root = ref<HTMLElement>()
const visible = ref(false)
let observer: IntersectionObserver | undefined
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        visible.value = true
        observer?.disconnect()
      }
    },
    { rootMargin: '200px 0px' },
  )
  if (root.value) observer.observe(root.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div ref="root" style="min-height: 1px">
    <component v-if="visible && demoMap[name]" :is="demoMap[name]" />
  </div>
</template>
