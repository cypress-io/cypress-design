<script lang="ts" setup>
import {
  IconAnimatedGeneralChatBubble,
  IconAnimatedObjectGear,
  IconAnimatedTechnologyGitBranches,
  IconAnimatedTechnologyServer,
  IconAnimatedViewChart,
  WindiColor,
} from '@cypress-design/vue-icon'
import { reactive, ref } from 'vue'
const animatedIcons = {
  IconAnimatedGeneralChatBubble,
  IconAnimatedObjectGear,
  IconAnimatedTechnologyGitBranches,
  IconAnimatedTechnologyServer,
  IconAnimatedViewChart,
} as const

const animated = reactive({
  IconAnimatedGeneralChatBubble: false,
  IconAnimatedObjectGear: false,
  IconAnimatedTechnologyGitBranches: false,
  IconAnimatedTechnologyServer: false,
  IconAnimatedViewChart: false,
})

const strokeColor = ref<WindiColor>('indigo-500')
const fillColor = ref<WindiColor>('jade-200')
const secondaryStrokeColor = ref<WindiColor>('orange-500')
const secondaryFillColor = ref<WindiColor>('orange-300')
</script>

<template>
  <div class="bg-gray-50 p-4 rounded text-center">
    <h2 class="text-[24px] m-4">Animated Icons</h2>
    <p class="m-4 text-gray-800">Click to see the animation start</p>
    <div class="flex flex-wrap justify-center gap-[16px] p-8 bg-white">
      <div
        class="flex flex-col items-center gap-[8px]"
        v-for="(Icon, iconName) of animatedIcons"
        :key="iconName"
      >
        <component
          :is="Icon"
          class="w-[64px] h-[64px]"
          :animated="animated[iconName]"
          :strokeColor
          :fillColor
          :secondaryStrokeColor
          @click="() => (animated[iconName] = !animated[iconName])"
        />
        <pre>&lt;{{ iconName }}/&gt;</pre>
      </div>
    </div>
  </div>
</template>
