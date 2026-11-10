<script lang="ts" setup>
import { normalizeClass, onMounted, onUnmounted, ref, watch } from 'vue'
import { twMerge } from 'tailwind-merge'
import {
  ClassModal,
  ClassModalFullscreenDimensions,
  ClassModalSizes,
  ClassModalStandardDimensions,
  ClassTitleBox,
  ClassTitle,
  ClassHelpLinkDash,
  ClassHelpLink,
  ClassCloseButton,
  ClassContent,
  ClassFooter,
  disableBodyScroll,
  freeBodyScroll,
  type ModalSize,
} from '@cypress-design/constants-modal'
import {
  IconActionDelete,
  IconActionQuestionMarkCircle,
} from '@cypress-design/vue-icon'

// `class` is merged with twMerge on the dialog so it can override the size and
// other defaults; Vue's own fallthrough would only append it.
defineOptions({ inheritAttrs: false })

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
    /**
     * Fixed width. Without it, the modal sizes to its content. Ignored when
     * `fullscreen` is set.
     */
    size?: ModalSize
    /**
     * Whether a click on the backdrop closes the modal.
     */
    closeOnBackdropClick?: boolean
    /**
     * Whether Escape closes the modal.
     */
    closeOnEscape?: boolean
    titleBoxClassName?: string
    contentClassName?: string
    footerClassName?: string
  }>(),
  {
    helpLinkLabel: 'Need help',
    closeOnBackdropClick: true,
    closeOnEscape: true,
  },
)

defineSlots<{
  default?: () => unknown
  closeIcon?: () => unknown
  footer?: () => unknown
}>()

// normalizeClass flattens Vue's object and array class syntax, which twMerge
// would otherwise drop. Called from the template, since attrs aren't reactive.
function dialogClass(attrClass: unknown) {
  return twMerge(
    internalShow.value ? ClassModal : null,
    props.fullscreen
      ? ClassModalFullscreenDimensions
      : props.size
        ? ClassModalSizes[props.size]
        : ClassModalStandardDimensions,
    normalizeClass(attrClass),
  )
}

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
  // Mounted with `show` already true: the watcher below only reacts to
  // changes, so open it as a real modal (backdrop, top layer, scroll lock).
  if (internalShow.value) {
    disableBodyScroll()
    $dialog.value?.showModal()
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

function handleBackdropClick(event: MouseEvent) {
  if (!props.closeOnBackdropClick) return
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
function handleCancel(event: Event) {
  event.preventDefault()
  if (props.closeOnEscape) internalShow.value = false
}

// Set while an Escape keypress is in flight, so a native close it causes can
// be told apart from `<form method="dialog">` or `dialog.close()`.
let pressedEscape = false
function handleKeyDown(event: KeyboardEvent) {
  if (event.key !== 'Escape') return
  pressedEscape = true
  setTimeout(() => (pressedEscape = false))
}

// Safety net for any native close we didn't initiate (a repeated Escape the
// browser won't let us cancel, `<form method="dialog">`, `dialog.close()`):
// bring our state, events, and the scroll lock back in line. An Escape that
// isn't allowed to close reopens the dialog instead.
function handleNativeClose() {
  if (!internalShow.value) return
  if (pressedEscape && !props.closeOnEscape) {
    setTimeout(() => {
      const dialog = $dialog.value
      if (internalShow.value && dialog && !dialog.open) dialog.showModal()
    })
    return
  }
  internalShow.value = false
}
</script>

<template>
  <dialog
    ref="$dialog"
    v-bind="{ ...$attrs, class: undefined }"
    :class="dialogClass($attrs.class)"
    @click="handleBackdropClick"
    @cancel="handleCancel"
    @keydown="handleKeyDown"
    @close="handleNativeClose"
  >
    <div :class="twMerge(ClassTitleBox, titleBoxClassName)">
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
    <div :class="twMerge(ClassContent, contentClassName)">
      <slot />
    </div>
    <div v-if="$slots.footer" :class="twMerge(ClassFooter, footerClassName)">
      <slot name="footer" />
    </div>
  </dialog>
</template>
