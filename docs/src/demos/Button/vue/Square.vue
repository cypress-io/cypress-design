<script setup lang="ts">
import Button from '@cypress-design/vue-button'
import { IconActionQuestionMarkCircle } from '@cypress-design/vue-icon'

const sizes = ['20', '24', '32', '40', '48'] as const
</script>

<template>
  <div class="flex items-center gap-4">
    <!-- `square` gives icon-only buttons equal width and height. -->
    <Button v-for="size in sizes" :key="size" :size="size" square>
      <IconActionQuestionMarkCircle
        fill-color="indigo-400"
        :style="{
          width: `${Number(size) / 2}px`,
          height: `${Number(size) / 2}px`,
        }"
      />
    </Button>
  </div>
</template>
