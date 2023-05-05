<template>
  <div :id="id" class="bg-jade-100" :class="class">
    <label>{{ label }}</label>
    Only React component implemented so far, see examples below:
  </div>
</template>

<script lang="ts" setup>
import { SharedSettings } from '@cypress-design/constants-input'

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
