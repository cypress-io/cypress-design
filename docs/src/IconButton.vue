<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue'
import { IconActionDeleteMedium } from '@cypress-design/vue-icon'
import _ from 'lodash'
import CopyButton from './CopyButton.vue'
import IconSized from './IconSized.vue'

const { upperFirst, camelCase } = _

const props = defineProps<{
  iconName: string
  groupName: string
  meta: {
    availableSizes: readonly string[]
    hasStrokeColor: readonly string[] | false
    hasFillColor: readonly string[] | false
    hasSecondaryStrokeColor: readonly string[] | false
    hasSecondaryFillColor: readonly string[] | false
  }
  focused: boolean
}>()

const localFocused = ref(false)
const overlay = ref(false)

const focused = computed(() => props.focused || localFocused.value)

const placeholderStyle = ref({
  width: '1px',
  height: '1px',
  top: '0',
  left: '0',
})

const buttonStyle = ref({
  top: '0',
  height: '0',
  transform: 'none',
  transformOrigin: 'left center',
  transition: 'none',
})

watch(localFocused, (value) => {
  if (!value) {
    buttonStyle.value = {
      ...buttonStyle.value,
      transform: 'none',
      transition: 'none',
    }

    overlay.value = false

    // Closing removes the focused close button; keep keyboard users on the card
    if ($button.value?.contains(document.activeElement)) {
      nextTick(() => $button.value?.focus())
    }
  }
})

function focus() {
  overlay.value = true
  const buttonWidth = $button.value?.offsetWidth ?? 0
  const buttonLeft = $button.value?.offsetLeft ?? 0

  placeholderStyle.value = {
    top: `${$button.value?.offsetTop}px`,
    height: `${$button.value?.offsetHeight}px`,
    width: `${buttonWidth}px`,
    left: `${buttonLeft}px`,
  }

  const completeWidth = $button.value?.offsetParent?.clientWidth ?? 1

  buttonStyle.value = {
    ...buttonStyle.value,
    transform: `translateX(${buttonLeft - 36}px) scaleX(${
      buttonWidth / (completeWidth - 74)
    })`,
    top: `${($button.value?.offsetTop ?? 0) + 4}px`,
    height: `${($button.value?.offsetHeight ?? 0) - 8}px`,
  }

  nextTick(() => {
    localFocused.value = true
    setTimeout(() => {
      $closeButton.value?.focus()
      buttonStyle.value = {
        ...buttonStyle.value,
        transition: 'transform 0.15s linear',
        transform: 'none',
      }
    }, 0)
  })
}

const $button = ref<HTMLDivElement>()
const $closeButton = ref<HTMLButtonElement>()

// Like a native button, a key only opens the card if it went down on the card:
// the keyup of an Enter that closed the card lands here too
let keyDownOnCard = false

function onKeyDown() {
  keyDownOnCard = true
}

function onKeyUp() {
  if (keyDownOnCard && !focused.value) focus()
  keyDownOnCard = false
}

const sizesGridCols = computed(
  () => `grid-cols-${Math.min(props.meta.availableSizes.length, 4)}`,
)
// <tw-include class="grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4"/>
</script>

<template>
  <!-- Backdrop click is the pointer counterpart of Escape on the card -->
  <!-- eslint-disable-next-line vuejs-accessibility/click-events-have-key-events, vuejs-accessibility/no-static-element-interactions -->
  <div
    v-if="overlay"
    class="absolute left-0 top-0 z-10 h-full w-full bg-gray-500 transition transition-opacity"
    :class="{
      'opacity-0': buttonStyle.transition === 'none',
      'opacity-70': buttonStyle.transition !== 'none',
    }"
    @click="localFocused = false"
  />
  <div
    v-if="localFocused"
    class="rounded bg-indigo-500"
    :style="placeholderStyle"
  />
  <!-- A button while collapsed; the rule can't read the bound role. Opens on
       keyup so no key event from the same press lands on the close button
       that takes focus -->
  <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions -->
  <div
    ref="$button"
    tabindex="0"
    :role="focused ? undefined : 'button'"
    class="flex min-h-[72px] flex-wrap items-center gap-x-[16px] overflow-hidden rounded bg-indigo-50"
    :class="{
      'mx-[16px] !cursor-default justify-end px-[8px] pb-[4px] md:flex-nowrap md:justify-start':
        focused,
      'cursor-pointer justify-center py-[8px] transition-colors hover:bg-indigo-100':
        !focused,
      'absolute left-0 right-0 z-20 min-h-[120px] w-auto items-center md:left-[28px] md:right-[28px] md:min-h-0':
        localFocused,
      'mx-auto w-[calc(100%-32px)] items-end lg:w-[700px]':
        !localFocused && focused,
    }"
    :style="localFocused ? buttonStyle : undefined"
    @click="!focused ? focus() : undefined"
    @keydown.enter.self="onKeyDown"
    @keydown.space.self.prevent="onKeyDown"
    @keyup.enter.self="onKeyUp"
    @keyup.space.self="onKeyUp"
    @keyup.escape="localFocused = false"
  >
    <button
      v-if="localFocused"
      ref="$closeButton"
      class="absolute right-[4px] top-[4px] rounded-full border-2 border-solid border-transparent hover:border-gray-500"
      @click.stop="localFocused = false"
    >
      <span class="sr-only">Close</span>
      <IconActionDeleteMedium />
    </button>
    <p
      class="shrink-0 overflow-hidden whitespace-nowrap py-[4px] text-[16px] leading-none"
      :class="{
        'w-full text-left md:w-auto md:min-w-[350px] md:text-right': focused,
        hidden: !focused,
      }"
    >
      <span class="group mb-[8px] flex items-center gap-x-[8px] md:justify-end"
        ><CopyButton class="hidden md:block" :text="iconName" /><code
          class="!m-0 leading-none"
          >{{ iconName }}</code
        ></span
      >
      <span class="group flex items-center gap-x-[8px] md:justify-end"
        ><CopyButton
          class="hidden md:block"
          :text="`&lt;Icon${upperFirst(camelCase(iconName))}/&gt;`"
        /><code class="!m-0 leading-none"
          >&lt;Icon{{ upperFirst(camelCase(iconName)) }} /&gt;</code
        ></span
      >
    </p>

    <div
      class="grid grow gap-[16px] transition-all duration-1000"
      :class="localFocused ? 'grid-cols-5 justify-items-center' : sizesGridCols"
    >
      <IconSized
        v-for="size in meta.availableSizes"
        :key="size"
        :focused="focused"
        :iconName="iconName"
        :groupName="groupName"
        :size="size"
        :meta="meta"
      />
    </div>
  </div>
</template>
