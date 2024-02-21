<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { IconSet } from './interfaces'

const props = defineProps<
  {
    label: string
    href?: string
    active: boolean
  } & IconSet
>()

const animated = ref(!!props.active)

watch(
  () => props.active,
  (newVal) => {
    if (newVal) return
    animated.value = false
  },
)

const IconActive = computed(() => props.iconActive)
const Icon = computed(() => props.icon)
</script>

<template>
  <a
    :href="href"
    :class="[
      'flex gap-4 group',
      {
        'text-gray-500': !active,
        'text-indigo-300': active,
      },
    ]"
    @mouseup="
      (e) => {
        e.preventDefault()
        animated = true
      }
    "
  >
    <IconActive
      v-if="active"
      :animated="animated"
      width="24"
      height="24"
      class="icon-dark-secondary-indigo-500 icon-light-indigo-300 icon-dark-indigo-400"
    />

    <Icon
      v-else
      size="24"
      strokeColor="gray-600"
      fillColor="gray-900"
      secondaryFillColor="gray-900"
      hoverStrokeColor="gray-400"
      interactiveColorsOnGroup
    />
    {{ label }}
  </a>
</template>
