<script lang="ts" setup>
import { CssSize, CssColor } from '@cypress-design/constants-tag'
import Tag from '@cypress-design/vue-tag'

const sizes = Object.keys(CssSize) as Array<keyof typeof CssSize>
const colors = Object.keys(CssColor) as Array<keyof typeof CssColor>
</script>

<template>
  <Tag size="24" color="jade" class="px-2">Tag</Tag>
  <div
    class="mt-5 flex flex-row flex-wrap items-start justify-center gap-6 bg-gray-700"
  >
    <div
      v-for="size of sizes"
      :key="size"
      class="my-4 flex flex-col items-center justify-center gap-3 rounded-lg bg-white p-4"
    >
      <h3 class="text-right">{{ size }}</h3>
      <div
        v-for="color of colors"
        :key="color"
        class="flex items-center justify-stretch gap-4"
      >
        <div class="flex items-center justify-center">
          <Tag :size="size" :color="color">{{ color }}</Tag>
        </div>
        <div class="flex items-center justify-center">
          <Tag :size="size" :color="color" outline>{{ color }} outline</Tag>
        </div>
        <div class="flex items-center justify-center">
          <Tag :size="size" :color="color" dark>{{ color }} dark</Tag>
        </div>
        <div class="flex items-center justify-center">
          <Tag :size="size" :color="color" dark outline
            >{{ color }} dark outline</Tag
          >
        </div>
      </div>
    </div>
  </div>
</template>
