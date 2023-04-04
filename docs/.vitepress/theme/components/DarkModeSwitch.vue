<script lang="ts" setup>
import { IconShapeSunLong } from '@cypress-design/vue-icon'
import { useAppearance } from '../utils/useAppearance'
import { IconShapeMoonCrescent } from '@cypress-design/vue-icon'

const { toggle, checked } = useAppearance()
</script>

<template>
  <button
    class="border border-solid rounded-full p-[4px] pl-[30px] transition duration-500 group"
    :class="{
      'border-gray-100 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-100 hover:ring-indigo-100 hover:ring-2':
        !checked,
      'border-gray-800 bg-gray-900 hover:border-indigo-400 hover:bg-indigo-800 hover:ring-indigo-800 hover:ring-2':
        checked,
    }"
    @click="toggle"
  >
    <span
      class="block rounded-full h-[32px] w-[32px] transition duration-500 p-[8px]"
      :class="{
        'transform translate-x-[-26px] bg-gray-800': checked,
        'bg-white': !checked,
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
          'opacity-0': checked,
          'opacity-100': !checked,
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
          'opacity-0': !checked,
          'opacity-100': checked,
        }"
      />
    </span>
  </button>
</template>
