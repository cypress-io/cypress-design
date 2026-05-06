<script lang="ts" setup>
import Button, {
  VariantClassesTable,
  SizeClassesTable,
} from '@cypress-design/vue-button'
import { IconActionQuestionMarkCircle } from '@cypress-design/vue-icon'

const squareSizes = ['20', '24', '32', '40', '48'] as const

const darkVariants = [
  'outline-dark',
  'outline-red-dark-mode',
  'outline-jade-dark-mode',
  'outline-indigo-dark-mode',
  'outline-purple-dark-mode',
  'red-dark-mode',
  'purple-dark-mode',
  'indigo-dark-mode',
  'disabled-dark-mode',
]
</script>

<template>
  <!-- Basic usage -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    Basic
  </p>
  <div class="flex items-center gap-4 mb-4">
    <Button>
      <IconActionQuestionMarkCircle class="mr-2" fill-color="indigo-400" />
      Button
    </Button>
  </div>

  <!-- Square icon buttons at all sizes -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    Square — all sizes
  </p>
  <div class="flex gap-4 items-center mb-6">
    <Button v-for="size of squareSizes" :key="size" :size="size" square>
      <IconActionQuestionMarkCircle
        fill-color="indigo-400"
        :style="{
          width: `${Number(size) / 2}px`,
          height: `${Number(size) / 2}px`,
        }"
      />
    </Button>
  </div>

  <!-- All variants × sizes -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    All variants — each size + disabled (🚫)
  </p>
  <div class="flex flex-wrap justify-stretch gap-2">
    <div
      v-for="(_, variant) in VariantClassesTable"
      :key="variant"
      class="p-2 py-3 flex flex-col items-center gap-4 rounded min-w-[180px]"
      :class="{
        'bg-gray-1000 text-white': darkVariants.includes(variant),
        'bg-white text-gray-900': !darkVariants.includes(variant),
      }"
    >
      <span class="text-xs">{{ variant }}</span>
      <div
        v-for="(_, size) in SizeClassesTable"
        :key="size"
        class="flex gap-2 items-center"
      >
        <span class="text-xs w-6">{{ size }}</span>
        <Button :variant="variant" :size="size">Button</Button>
      </div>
      <div class="flex gap-2 items-center">
        <span class="text-xs w-6">🚫</span>
        <Button :variant="variant" size="48" disabled>Button</Button>
      </div>
    </div>
  </div>
</template>
