<script lang="ts" setup>
import type { Component } from 'vue'
import {
  CssIconClasses,
  CssIconContentClasses,
  CssTruncateClasses,
  IconFillColor,
  IconStrokeColor,
  setTitleFromText,
} from '@cypress-design/constants-table'

defineProps<{
  icon?: Component
  truncate?: boolean
  widthClass?: string
  title?: string
  // Read `title` from the rendered text on hover (custom slot content).
  titleFromText?: boolean
}>()
</script>

<template>
  <span v-if="icon" :class="[CssIconContentClasses, widthClass]">
    <component
      :is="icon"
      aria-hidden="true"
      :class="CssIconClasses"
      :stroke-color="IconStrokeColor"
      :fill-color="IconFillColor"
    />
    <span
      :class="truncate ? CssTruncateClasses : undefined"
      :title="title"
      @mouseenter="
        titleFromText
          ? setTitleFromText($event.currentTarget as HTMLElement)
          : undefined
      "
    >
      <slot />
    </span>
  </span>
  <span
    v-else-if="truncate"
    :class="[CssTruncateClasses, widthClass]"
    :title="title"
    @mouseenter="
      titleFromText
        ? setTitleFromText($event.currentTarget as HTMLElement)
        : undefined
    "
  >
    <slot />
  </span>
  <slot v-else />
</template>
