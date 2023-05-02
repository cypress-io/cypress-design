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
  <div class="relative">
    <button
      class="invisible group-hover:visible text-indigo-500 text-[12px] w-[32px]"
      :class="{
        'opacity-0': copiedSuccess,
        'opacity-100': !copiedSuccess,
      }"
      @click="() => copyCode(text)"
    >
      copy
    </button>
    <span
      v-if="copiedSuccess"
      class="text-green-500 text-[12px] inline-block w-[40px] absolute right-0 top-1"
      >copied</span
    >
  </div>
</template>
