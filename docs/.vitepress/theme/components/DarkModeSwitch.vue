<script lang="ts" setup>
import { IconShapeSunLong } from '@cypress-design/vue-icon'
import { useAppearance } from '../utils/useAppearance'

const { toggle, checked } = useAppearance()
</script>

<template>
  <button
    class="border border-gray-100 rounded-full bg-gray-50 p-[2px] pl-[34px]"
    @click="toggle"
  >
    <span class="block bg-white rounded-full h-[32px] w-[32px]">
      <IconShapeSunLong />
    </span>
  </button>
</template>
