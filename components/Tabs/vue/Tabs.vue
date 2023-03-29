<script lang="ts" setup>
import { ref } from 'vue'
import { Tab, classes } from '../constants'

const props = defineProps<{
  tabs: Tab[]
}>()

const $tab = ref<HTMLButtonElement[]>()

const emit = defineEmits<{
  (event: 'change', tab: Tab): void
}>()

const activeId = ref(props.tabs.find((tab) => tab.active)?.id)

function navigate(shift: number) {
  const shiftedIndex =
    props.tabs.findIndex((tab) => tab.id === activeId.value) + shift
  const nextIndex =
    shiftedIndex < 0
      ? props.tabs.length - 1
      : shiftedIndex >= props.tabs.length
      ? 0
      : shiftedIndex
  activeId.value = props.tabs[nextIndex].id
  $tab.value?.[nextIndex]?.focus()
  emit('change', props.tabs[nextIndex])
}
</script>

<template>
  <div role="tablist" :class="classes.wrapper">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      ref="$tab"
      role="tab"
      :tabindex="tab.id === activeId ? undefined : -1"
      :class="[
        classes.button,
        {
          [classes.active]: tab.id === activeId,
          [classes.inActive]: tab.id !== activeId,
        },
      ]"
      @click="
        () => {
          activeId = tab.id
          emit('change', tab)
        }
      "
      @keyup.left="navigate(-1)"
      @keyup.right="navigate(1)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
