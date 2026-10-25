<script lang="ts" setup>
import { ref } from 'vue'

defineProps<{
  text: string
}>()

const copiedSuccess = ref(false)
function copyCode(text: string) {
  const el = document.createElement('textarea')
  el.value = text
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  copiedSuccess.value = true
  setTimeout(() => {
    copiedSuccess.value = false
  }, 1000)
}
</script>

<template>
  <span class="relative">
    <button
      class="invisible w-8 text-xs text-indigo-500 group-hover:visible"
      :class="{
        'opacity-0': copiedSuccess,
        'opacity-100': !copiedSuccess,
      }"
      @click.stop="() => copyCode(text)"
    >
      copy
    </button>
    <span
      v-if="copiedSuccess"
      class="absolute right-0 top-1 inline-block w-10 text-xs text-green-500"
      >copied</span
    >
  </span>
</template>
