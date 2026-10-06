<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'

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
</script>

<template>
  <component v-if="demoMap[name]" :is="demoMap[name]" />
</template>
