<script lang="ts" setup>
import { IconObjectBook } from '@cypress-design/vue-icon'
</script>

<template>
  <!-- Stroke color + hover color -->
  <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
    Stroke and fill colors with hover
  </p>
  <div class="mb-4 flex items-center gap-2 font-medium text-gray-700">
    <IconObjectBook
      size="24"
      fillColor="indigo-200"
      strokeColor="indigo-600"
      hoverFillColor="jade-200"
      hoverStrokeColor="teal-600"
    />
    Hover the icon
  </div>

  <!-- interactiveColorsOnGroup — color follows parent hover -->
  <p class="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
    <code>interactiveColorsOnGroup</code> — colors follow parent hover
  </p>
  <div>
    <button
      class="group flex items-center gap-2 font-medium text-indigo-500 hover:text-jade-600"
    >
      <IconObjectBook
        size="24"
        fillColor="indigo-200"
        strokeColor="indigo-600"
        hoverFillColor="jade-200"
        hoverStrokeColor="teal-600"
        interactiveColorsOnGroup
      />
      Hover the button
    </button>
  </div>
</template>
