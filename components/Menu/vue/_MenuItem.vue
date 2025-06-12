<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { IconSet } from './interfaces'

const props = defineProps<
  {
    label: string
    href?: string
    active?: boolean
  } & IconSet
>()

const animated = ref(!!props.active)
const transientActive = ref(false)

watch(
  () => props.active,
  (newVal) => {
    if (!newVal) {
      animated.value = false
    }
  },
)

const visuallyActive = computed(() => props.active || transientActive.value)

const IconActive = computed(() => props.iconActive)
const Icon = computed(() => props.icon)

const handleMouseDown = (e: MouseEvent) => {
  e.preventDefault()
  transientActive.value = true
}

const handleMouseUp = (e: MouseEvent) => {
  e.preventDefault()
  animated.value = true
  setTimeout(() => {
    transientActive.value = false
  }, 0)
}

const handleMouseLeave = () => {
  transientActive.value = false
}
</script>

<template>
  <a
    :href="href"
    :class="[
      'flex gap-4 group',
      {
        'text-gray-500': !visuallyActive,
        'text-indigo-300': visuallyActive,
        'p-2 px-7 mx-7 border-l border-gray-800': !icon || !iconActive,
        'p-4': icon && iconActive,
      },
    ]"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseLeave"
  >
    <template v-if="icon">
      <template v-if="iconActive">
        <span
          class="relative inline-flex w-[24px] h-[24px] shrink-0 items-center justify-center align-middle"
        >
          <Icon
            v-show="!visuallyActive"
            size="24"
            strokeColor="gray-600"
            fillColor="gray-900"
            secondaryFillColor="gray-900"
            hoverStrokeColor="gray-400"
            interactiveColorsOnGroup
            class="absolute inset-0 transition-opacity"
          />
          <IconActive
            v-show="visuallyActive"
            :animated="animated"
            width="24"
            height="24"
            class="absolute inset-0 transition-opacity icon-dark-secondary-indigo-500 icon-light-indigo-300 icon-dark-indigo-400"
          />
        </span>
      </template>
      <template v-else>
        <Icon
          size="24"
          strokeColor="gray-600"
          fillColor="gray-900"
          secondaryFillColor="gray-900"
          hoverStrokeColor="gray-400"
          interactiveColorsOnGroup
          :class="{
            'icon-dark-secondary-indigo-500 icon-light-indigo-300 icon-dark-indigo-400':
              active,
          }"
        />
      </template>
    </template>
    {{ label }}
  </a>
</template>
