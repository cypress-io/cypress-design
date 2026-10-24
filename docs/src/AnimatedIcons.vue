<script lang="ts" setup>
import {
  IconAnimatedGeneralChatBubble,
  IconAnimatedObjectGear,
  IconAnimatedTechnologyGitBranches,
  IconAnimatedTechnologyServer,
  IconAnimatedViewChart,
} from '@cypress-design/vue-icon'
import { reactive } from 'vue'
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
</script>

<template>
  <div class="rounded bg-gray-50 p-4 text-center">
    <h2 class="m-4 text-[24px]">Animated Icons</h2>
    <p class="m-4 text-gray-800">Click to see the animation start</p>
    <div class="flex flex-wrap justify-center gap-[16px] bg-white p-8">
      <div
        class="flex flex-col items-center gap-[8px]"
        v-for="(Icon, iconName) of animatedIcons"
        :key="iconName"
      >
        <component
          :is="Icon"
          class="h-[64px] w-[64px]"
          :animated="animated[iconName]"
          stroke-color="indigo-500"
          fill-color="jade-200"
          secondary-stroke-color="orange-500"
          @click="() => (animated[iconName] = !animated[iconName])"
        />
        <pre>&lt;{{ iconName }}/&gt;</pre>
      </div>
    </div>
  </div>
</template>
