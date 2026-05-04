<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'

defineProps<{ name: string }>()

// Lazy-load each demo so a single broken demo package doesn't block other
// pages — only the active demo gets imported at runtime.
const demoLoaders = import.meta.glob('../demos/*.vue')

const demoMap: Record<string, any> = Object.fromEntries(
  Object.entries(demoLoaders).map(([path, loader]) => {
    const name = path.split('/').pop()!.replace('.vue', '')
    return [name, defineAsyncComponent(loader as any)]
  }),
)
</script>

<template>
  <component v-if="demoMap[name]" :is="demoMap[name]" />
</template>
