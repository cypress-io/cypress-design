<script lang="ts" setup>
import type { Component } from 'vue'
import {
  CssCellIconContentClasses,
  CssIconClasses,
  CssTruncateClasses,
  IconFillColor,
  IconStrokeColor,
} from '@cypress-design/constants-table'

defineProps<{
  icon?: Component
  truncate?: boolean
  title?: string
}>()
</script>

<template>
  <span v-if="icon" :class="CssCellIconContentClasses">
    <component
      :is="icon"
      aria-hidden="true"
      :class="CssIconClasses"
      :stroke-color="IconStrokeColor"
      :fill-color="IconFillColor"
    />
    <span :class="truncate ? CssTruncateClasses : undefined" :title="title">
      <slot />
    </span>
  </span>
  <span v-else-if="truncate" :class="CssTruncateClasses" :title="title">
    <slot />
  </span>
  <slot v-else />
</template>
