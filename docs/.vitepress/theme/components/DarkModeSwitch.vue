<script lang="ts" setup>
import { useAppearance } from '../utils/useAppearance'

const { toggle, checked } = useAppearance()
</script>

<template>
  <button @click="toggle">
    <span :class="{ underline: checked }">dark</span>/<span
      :class="{ underline: !checked }"
      >light</span
    >
  </button>
</template>
