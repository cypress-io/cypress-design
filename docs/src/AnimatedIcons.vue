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
    <h2 class="m-4 text-2xl">Animated Icons</h2>
    <p class="m-4 text-gray-800">Click to see the animation start</p>
    <div class="flex flex-wrap justify-center gap-4 bg-white p-8">
      <div
        v-for="(Icon, iconName) of animatedIcons"
        :key="iconName"
        class="flex flex-col items-center gap-2"
      >
        <component
          :is="Icon"
          class="size-16"
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
