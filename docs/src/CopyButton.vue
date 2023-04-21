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
  <button
    v-if="!copiedSuccess"
    class="invisible group-hover:visible text-indigo-500 text-[12px] w-[32px]"
    @click="(e) => copyCode(text)"
  >
    copy
  </button>
  <span v-else class="text-green-500 text-[12px] inline-block w-[32px]"
    >copied</span
  >
</template>
