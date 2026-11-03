<script lang="ts" setup>
import ProgressBar from '@cypress-design/vue-progressbar'

const sizes = ['6', '8', '12'] as const
const colors = [
  'indigo',
  'indigo-light',
  'purple',
  'teal',
  'jade',
  'red',
  'orange',
  'gray',
] as const
const segments = [
  { value: 233, label: 'Open mode' },
  { value: 179, label: 'Run mode', color: 'teal' as const },
]
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <section class="rounded bg-white p-4">
      <h3 class="mb-2 text-sm font-medium text-gray-500">Sizes</h3>
      <div class="flex flex-col gap-3">
        <ProgressBar
          v-for="size in sizes"
          :key="size"
          :size="size"
          :value="36"
          :aria-label="`${size}px bar`"
        />
      </div>
    </section>

    <section class="rounded bg-white p-4">
      <h3 class="mb-2 text-sm font-medium text-gray-500">Colors</h3>
      <div class="flex flex-col gap-3">
        <ProgressBar
          v-for="color in colors"
          :key="color"
          :color="color"
          :value="60"
          :aria-label="`${color} bar`"
        />
      </div>
    </section>

    <section class="rounded bg-white p-4">
      <h3 class="mb-2 text-sm font-medium text-gray-500">Active</h3>
      <ProgressBar :value="36" active aria-label="Uploading test results" />
    </section>

    <section class="rounded bg-white p-4">
      <h3 class="mb-2 text-sm font-medium text-gray-500">Segments</h3>
      <ProgressBar
        :max="412"
        :segments="segments"
        aria-label="Test runs by mode"
      />
    </section>

    <section class="rounded bg-gray-1000 p-4">
      <h3 class="mb-2 text-sm font-medium !text-gray-300">Dark theme</h3>
      <div class="flex flex-col gap-3">
        <ProgressBar
          v-for="color in colors"
          :key="color"
          theme="dark"
          :color="color"
          :value="60"
          :aria-label="`${color} bar, dark`"
        />
        <ProgressBar
          theme="dark"
          :max="412"
          :segments="segments"
          aria-label="Test runs by mode, dark"
        />
      </div>
    </section>
  </div>
</template>
