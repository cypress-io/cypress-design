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
  <div>
    <h2 class="text-[24px] text-center !mb-4 !mt-0">Animated Icons</h2>
    <div class="flex flex-wrap justify-center gap-[16px] px-[24px]">
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
          @mousedown="() => (animated[iconName] = true)"
          @mouseup="() => (animated[iconName] = false)"
        />
        <p>{{ iconName }}</p>
      </div>
    </div>
  </div>
</template>
