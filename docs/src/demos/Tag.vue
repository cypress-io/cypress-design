<script lang="ts" setup>
import { CssSize, CssColor } from '@cypress-design/constants-tag'
import Tag from '@cypress-design/vue-tag'

const sizes = Object.keys(CssSize) as Array<keyof typeof CssSize>
const colors = Object.keys(CssColor) as Array<keyof typeof CssColor>
</script>

<template>
  <Tag size="24" color="jade" class="px-[8px]">Tag</Tag>
  <div
    class="flex flex-row flex-wrap items-start justify-center gap-6 mt-5 bg-gray-700"
  >
    <div
      v-for="size of sizes"
      :key="size"
      class="flex flex-col items-center justify-center gap-3 p-4 my-4 bg-white rounded-lg"
    >
      <h3 class="text-right">{{ size }}</h3>
      <div
        v-for="color of colors"
        :key="color"
        class="flex items-center gap-4 justify-stretch"
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
