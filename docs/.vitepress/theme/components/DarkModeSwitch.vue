<script lang="ts" setup>
import { onMounted, getCurrentInstance, ref, computed } from 'vue'
import {
  IconShapeSunLong,
  IconShapeMoonCrescent,
} from '@cypress-design/vue-icon'
import { useDarkMode } from '../utils/useDarkMode'

const { toggle, isDark } = useDarkMode()
const isMounted = ref(false)

onMounted(() => {
  // the reactivity engine of vue kicks off too late
  // and skips updating the proper classes.
  // This forces it to update the component
  isMounted.value = true
})
</script>

<template>
  <button
    class="border border-solid rounded-full p-[4px] pl-[30px] transition duration-500 group"
    :class="{
      'border-gray-100 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-100 hover:ring-indigo-100 hover:ring-2':
        !isDark && isMounted,
      'border-gray-800 bg-gray-900 hover:border-indigo-400 hover:bg-indigo-800 hover:ring-indigo-800 hover:ring-2':
        isDark && isMounted,
    }"
    @click="toggle"
  >
    <span
      class="block rounded-full h-[32px] w-[32px] transition duration-500 p-[8px]"
      :class="{
        'transform translate-x-[-26px] bg-gray-800': isDark && isMounted,
        'bg-white': !isDark && isMounted,
      }"
    >
      <IconShapeSunLong
        interactive-colors-on-group
        stroke-color="gray-600"
        fill-color="gray-500"
        hover-stroke-color="indigo-500"
        hover-fill-color="indigo-400"
        class="absolute transition duration-500"
        :class="{
          'opacity-0': isDark && isMounted,
          'opacity-100': !isDark && isMounted,
        }"
      />
      <IconShapeMoonCrescent
        interactive-colors-on-group
        stroke-color="gray-200"
        fill-color="gray-1000"
        hover-stroke-color="indigo-200"
        hover-fill-color="indigo-400"
        class="absolute transition duration-500"
        :class="{
          'opacity-0': !isDark && isMounted,
          'opacity-100': isDark && isMounted,
        }"
      />
    </span>
  </button>
</template>
