<script lang="ts" setup>
import { ref } from 'vue'
import { useAppearance } from '../utils/useAppearance'

const isDark = ref(false)
const toggle = useAppearance(isDark)
</script>

<template>
  <button @click="toggle">
    <span :class="{ underline: isDark }">dark</span>/<span
      :class="{ underline: !isDark }"
      >light</span
    >
  </button>
</template>
