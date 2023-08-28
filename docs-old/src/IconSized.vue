<script lang="ts" setup>
import Icon, { WindiColor } from '@cypress-design/vue-icon'
import { ref } from 'vue'
import ColorSelector from './ColorSelector.vue'
const IconAny = Icon as any

defineProps<{
  focused: boolean
  groupName: string
  iconName: string
  size: string
  meta: Record<string, string[]>
}>()

const strokeColor = ref<WindiColor>()
const fillColor = ref<WindiColor>()
const secondaryStrokeColor = ref<WindiColor>()
const secondaryFillColor = ref<WindiColor>()
</script>

<template>
  <div class="flex gap-[8px] items-end">
    <div
      class="py-[4px] min-w-[32px] flex flex-col items-center gap-x-[16px] gap-y-[4px] justify-end"
      :class="{
        'pl-[4px] border-l border-gray-300': focused,
        'px-[8px] md:px-[4px] md:w-[164px]': !focused,
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
      <p class="text-gray-500 text-[12px] mt-1">
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
        v-model="strokeColor"
        v-if="meta.hasStrokeColor.includes?.(size)"
        >s</ColorSelector
      >
      <ColorSelector
        v-model="fillColor"
        v-if="meta.hasFillColor.includes?.(size)"
        >f</ColorSelector
      >
      <ColorSelector
        v-model="secondaryStrokeColor"
        v-if="meta.hasSecondaryStrokeColor.includes?.(size)"
        >s+</ColorSelector
      >
      <ColorSelector
        v-model="secondaryFillColor"
        v-if="meta.hasSecondaryFillColor.includes?.(size)"
        >f+</ColorSelector
      >
    </div>
  </div>
</template>
