<script setup lang="ts">
import Tag from '@cypress-design/vue-tag'

// `size` is the tag's height in px.
const sizes = ['16', '20', '24', '32'] as const
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <Tag v-for="size in sizes" :key="size" :size="size" color="jade">
      {{ size }}
    </Tag>
  </div>
</template>
