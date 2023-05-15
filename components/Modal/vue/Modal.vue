<template>
  <Teleport v-if="show" to="#modal-target">
    <div
      class="fixed left-0 top-0 z-1010 h-screen w-screen bg-gray-900/[.92] backdrop-blur"
      @click="closeModal"
      inert
    />
    <div
      class="pointer-events-none fixed left-0 top-0 z-1020 flex h-full w-screen items-center justify-center overflow-hidden"
      tabindex="-1"
      aria-modal="true"
      role="modal"
      @scroll.prevent=""
    >
      <div
        class="pointer-events-auto relative flex max-h-[80%] min-w-[200px] flex-col rounded-lg border-4 border-gray-700 bg-white sm:min-w-[390px]"
      >
        <div
          class="flex shrink-0 items-center justify-between rounded-t-md border-b border-gray-100 p-[16px] px-[24px]"
        >
          <div class="flex items-center">
            <div class="text-[18px] font-medium leading-[28px] text-gray-900">
              {{ title }}
            </div>
            <div
              v-if="helpLink"
              class="mx-[8px] h-[4px] w-[32px] border-t border-t-gray-100"
            />
            <a
              v-if="helpLink"
              :href="helpLink"
              class="flex items-center text-[16px] font-normal leading-[24px] text-indigo-500"
              target="_blank"
            >
              Need help
              <IconActionQuestionMarkCircle
                class="ml-[4px]"
                stroke-color="indigo-500"
                fill-color="indigo-100"
              />
            </a>
          </div>
          <button
            aria-label="Close"
            class="group rounded-full border-transparent p-[4px] outline-none"
            @click="closeModal()"
          >
            <IconActionDelete
              class="children:transition-all"
              stroke-color="gray-400"
              hover-stroke-color="gray-700"
              interactive-colors-on-group
            />
          </button>
        </div>
        <div class="overflow-y-auto p-[16px]">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import {
  IconActionDelete,
  IconActionQuestionMarkCircle,
} from '@cypress-design/vue-icon'

const show = ref(false)

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const props = defineProps<{
  title?: string
  modelValue?: boolean
  helpLink?: string
}>()

watch(
  () => props.modelValue,
  (val) => {
    show.value = val
  },
  { immediate: true }
)

const setIsOpen = (val: boolean) => {
  emit('update:modelValue', val)
}

const closeModal = () => {
  setIsOpen(false)
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>