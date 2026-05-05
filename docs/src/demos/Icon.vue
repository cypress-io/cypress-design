<script lang="ts" setup>
import { IconObjectBookCode, IconObjectBook } from '@cypress-design/vue-icon'
</script>

<template>
  <!-- Named import -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    Named import
  </p>
  <div class="mb-4">
    <IconObjectBookCode />
  </div>

  <!-- Stroke color + hover color -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    Stroke color &amp; hover
  </p>
  <div class="mb-4">
    <button class="flex items-center gap-2">
      <IconObjectBook
        size="16"
        strokeColor="blue-600"
        hoverStrokeColor="jade-600"
      />
      Hover me
    </button>
  </div>

  <!-- interactiveColorsOnGroup — color follows parent hover -->
  <p class="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
    <code>interactiveColorsOnGroup</code> — color follows parent hover
  </p>
  <div>
    <button class="group hover:text-jade-800 flex items-center gap-2">
      <IconObjectBook
        size="16"
        strokeColor="blue-600"
        hoverStrokeColor="jade-600"
        interactiveColorsOnGroup
      />
      Hover me
    </button>
  </div>
</template>
