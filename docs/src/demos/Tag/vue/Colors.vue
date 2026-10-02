<script setup lang="ts">
import Tag from '@cypress-design/vue-tag'

const colors = [
  'white',
  'gray',
  'gray-dark',
  'jade',
  'teal',
  'indigo',
  'purple',
  'red',
  'orange',
] as const
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <Tag v-for="color in colors" :key="color" size="24" :color="color">
      {{ color }}
    </Tag>
  </div>
</template>
