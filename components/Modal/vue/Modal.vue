<template>
  <Teleport v-if="show" to="#modal-target">
    <div :class="ClassBackDrop" @click="show = false" />
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
            @click="show = false"
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
import { onMounted, onUnmounted, ref, watch } from 'vue'
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
  disableBodyScroll,
  freeBodyScroll,
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

onMounted(() => {
  if (!document.querySelector('#modal-target')) {
    const modalTarget = document.createElement('div')
    modalTarget.id = 'modal-target'
    document.body.appendChild(modalTarget)
  }
})

watch(show, (val) => {
  if (val) {
    disableBodyScroll()
  } else {
    freeBodyScroll()
  }
  emit('update:modelValue', val)
})

onUnmounted(() => {
  freeBodyScroll()
})
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
