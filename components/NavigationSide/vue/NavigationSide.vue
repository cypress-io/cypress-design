<template>
  <div :id="id" class="bg-jade-100" :class="class">
    <label>{{ label }}</label>
    Template for NavigationSide
  </div>
</template>

<script lang="ts" setup>
import { SharedSettings } from '@cypress-design/constants-navigationside'

withDefaults(
  defineProps<{
    id: string
    label?: string
    class?: string
  }>(),
  {
    label: undefined,
    class: undefined,
  }
)
</script>
