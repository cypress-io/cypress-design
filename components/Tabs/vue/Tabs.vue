<script lang="ts" setup>
import { ref } from 'vue'
import { Tab, classes } from '../constants'

const props = defineProps<{
  tabs: Tab[]
}>()

const emit = defineEmits<{
  (event: 'change', tab: Tab): void
}>()

const activeId = ref(props.tabs.find((tab) => tab.active)?.id)
</script>

<template>
  <div role="tablist" :class="classes.wrapper">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      role="tab"
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
    >
      {{ tab.label }}
    </button>
  </div>
</template>
