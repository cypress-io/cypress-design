<template>
  <Teleport v-if="show" to="#modal-target">
    <div :class="ClassBackDrop" @click="closeModal" />
    <div
      :class="ClassModalContainer"
      tabindex="-1"
      aria-modal="true"
      role="modal"
    >
      <div :class="ClassModal">
        <div :class="ClassTitleBox">
          <div :class="ClassTitle">
            {{ title }}
          </div>
          <div v-if="helpLink" :class="ClassHelpLinkDash" />
          <a
            v-if="helpLink"
            :href="helpLink"
            :class="ClassHelpLink"
            target="_blank"
          >
            Need help
            <IconActionQuestionMarkCircle
              class="ml-[4px]"
              stroke-color="indigo-500"
              fill-color="indigo-100"
            />
          </a>
          <div class="grow" />
          <button
            aria-label="Close"
            :class="ClassCloseButton"
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
        <div :class="ClassContent">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import {
  ClassBackDrop,
  ClassModal,
  ClassModalContainer,
  ClassTitleBox,
  ClassTitle,
  ClassHelpLinkDash,
  ClassHelpLink,
  ClassCloseButton,
  ClassContent,
} from '@cypress-design/constants-modal'
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