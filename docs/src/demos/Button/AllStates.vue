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
  <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
    Basic
  </p>
  <div class="mb-4 flex items-center gap-4">
    <Button>
      <IconActionQuestionMarkCircle class="mr-2" fill-color="indigo-400" />
      Button
    </Button>
  </div>

  <!-- Square icon buttons at all sizes -->
  <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
    Square — all sizes
  </p>
  <div class="mb-6 flex items-center gap-4">
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
  <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
    All variants — each size + disabled (🚫)
  </p>
  <div class="flex flex-wrap justify-stretch gap-2">
    <div
      v-for="(_, variant) in VariantClassesTable"
      :key="variant"
      class="flex min-w-[180px] flex-col items-center gap-4 rounded p-2 py-3"
      :class="{
        'bg-gray-1000 text-white': darkVariants.includes(variant),
        'bg-white text-gray-900': !darkVariants.includes(variant),
      }"
    >
      <span class="text-xs">{{ variant }}</span>
      <div
        v-for="(_, size) in SizeClassesTable"
        :key="size"
        class="flex items-center gap-2"
      >
        <span class="w-6 text-xs">{{ size }}</span>
        <Button :variant="variant" :size="size">Button</Button>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-6 text-xs">🚫</span>
        <Button :variant="variant" size="48" disabled>Button</Button>
      </div>
    </div>
  </div>
</template>
