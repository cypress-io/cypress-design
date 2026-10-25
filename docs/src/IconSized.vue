<script lang="ts" setup>
import Icon from '@cypress-design/vue-icon'
import { ref, type Component } from 'vue'
import ColorSelector from './ColorSelector.vue'
// `name` and the colors are runtime strings, not Icon's literal unions
const IconAny: Component = Icon

// The sizes an icon supports a color in, or `false` when it has none
type ColorSizes = readonly string[] | false

defineProps<{
  focused: boolean
  groupName: string
  iconName: string
  size: string
  meta: {
    hasStrokeColor: ColorSizes
    hasFillColor: ColorSizes
    hasSecondaryStrokeColor: ColorSizes
    hasSecondaryFillColor: ColorSizes
  }
}>()

const supports = (sizes: ColorSizes, size: string) =>
  sizes !== false && sizes.includes(size)

const strokeColor = ref('indigo-500')
const fillColor = ref('jade-200')
const secondaryStrokeColor = ref('orange-500')
const secondaryFillColor = ref('orange-300')
</script>

<template>
  <div class="flex items-end gap-[8px]">
    <div
      class="flex min-w-[32px] flex-col items-center justify-end gap-x-[16px] gap-y-[4px] py-[4px]"
      :class="{
        'border-l border-gray-300 pl-[4px]': focused,
        'px-[8px] md:w-[164px] md:px-[4px]': !focused,
      }"
    >
      <IconAny
        :name="iconName"
        :size="size"
        :stroke-color="strokeColor"
        :fill-color="fillColor"
        :secondary-stroke-color="secondaryStrokeColor"
        :secondary-fill-color="secondaryFillColor"
      />
      <p class="mt-1 text-[12px] text-gray-500">
        <span v-if="!focused">{{ iconName.slice(groupName.length + 1) }}</span>
        {{ size }}
      </p>
    </div>
    <div
      v-if="focused"
      :key="`${iconName}_${size}`"
      class="text-center text-teal-500"
    >
      <ColorSelector
        v-if="supports(meta.hasStrokeColor, size)"
        v-model="strokeColor"
        label="Stroke color"
        >s</ColorSelector
      >
      <ColorSelector
        v-if="supports(meta.hasFillColor, size)"
        v-model="fillColor"
        label="Fill color"
        >f</ColorSelector
      >
      <ColorSelector
        v-if="supports(meta.hasSecondaryStrokeColor, size)"
        v-model="secondaryStrokeColor"
        label="Secondary stroke color"
        >s+</ColorSelector
      >
      <ColorSelector
        v-if="supports(meta.hasSecondaryFillColor, size)"
        v-model="secondaryFillColor"
        label="Secondary fill color"
        >f+</ColorSelector
      >
    </div>
  </div>
</template>
