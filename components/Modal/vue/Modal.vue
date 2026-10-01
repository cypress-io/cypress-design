<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import {
  ClassModal,
  ClassModalFullscreenDimensions,
  ClassModalStandardDimensions,
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

const internalShow = ref(false)

const emit = defineEmits<{
  (event: 'close'): void
  (event: 'update:show', value: boolean): void
}>()

const props = withDefaults(
  defineProps<{
    title?: string
    show?: boolean
    helpLink?: string
    helpLinkLabel?: string
    fullscreen?: boolean
  }>(),
  {
    helpLinkLabel: 'Need help',
  },
)

defineSlots<{
  default?: () => unknown
  closeIcon?: () => unknown
}>()

const $dialog = ref<HTMLDialogElement>()

watch(
  () => props.show,
  (val) => {
    internalShow.value = val
  },
  { immediate: true },
)

onMounted(() => {
  if (!document.querySelector('#modal-target')) {
    const modalTarget = document.createElement('div')
    modalTarget.id = 'modal-target'
    document.body.appendChild(modalTarget)
  }
})

watch(internalShow, (val) => {
  if (val) {
    disableBodyScroll()
    $dialog.value?.showModal()
  } else {
    $dialog.value?.close()
    freeBodyScroll()
  }

  emit('update:show', val)
  if (!val) {
    emit('close')
  }
})

onUnmounted(() => {
  freeBodyScroll()
})

function closeOnClickBackdrop(event: MouseEvent) {
  var rect = $dialog.value?.getBoundingClientRect()
  if (!rect) return
  var isInDialog =
    rect.top <= event.clientY &&
    event.clientY <= rect.top + rect.height &&
    rect.left <= event.clientX &&
    event.clientX <= rect.left + rect.width
  if (!isInDialog) {
    internalShow.value = false
  }
}

// Escape fires `cancel` on the native dialog. Stop the browser closing it
// behind our back and close through the same path as the close button.
function closeOnCancel(event: Event) {
  event.preventDefault()
  internalShow.value = false
}
</script>

<template>
  <dialog
    ref="$dialog"
    :class="[
      internalShow ? ClassModal : null,
      fullscreen
        ? ClassModalFullscreenDimensions
        : ClassModalStandardDimensions,
    ]"
    @click="closeOnClickBackdrop"
    @cancel="closeOnCancel"
  >
    <div :class="ClassTitleBox">
      <div id="cy_modal_label" :class="ClassTitle">
        {{ title }}
      </div>
      <div v-if="helpLink" :class="ClassHelpLinkDash" />
      <a
        v-if="helpLink"
        :href="helpLink"
        :class="ClassHelpLink"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ helpLinkLabel }}
        <IconActionQuestionMarkCircle
          class="ml-[4px]"
          stroke-color="indigo-500"
          fill-color="indigo-100"
        />
      </a>
      <div class="grow" />
      <button
        aria-label="Close"
        :class="[ClassCloseButton, 'group']"
        @click="internalShow = false"
      >
        <slot name="closeIcon">
          <IconActionDelete
            class="children:transition-all"
            stroke-color="gray-400"
            hover-stroke-color="gray-700"
            interactive-colors-on-group
          />
        </slot>
      </button>
    </div>
    <div :class="ClassContent">
      <slot />
    </div>
  </dialog>
</template>
