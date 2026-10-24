<script lang="ts" setup>
import Icon from '@cypress-design/vue-icon'
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
