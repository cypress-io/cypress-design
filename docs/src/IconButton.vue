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

const sizesGridCols = computed(
  () => `grid-cols-${Math.min(props.meta.availableSizes.length, 4)}`,
)
// <tw-include class="grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4"/>
</script>

<template>
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
  <div
    ref="$button"
    tabindex="0"
    class="flex min-h-16 flex-wrap items-center gap-x-4 overflow-hidden rounded bg-indigo-50"
    :class="{
      'mx-4 !cursor-default justify-end px-2 pb-1 md:flex-nowrap md:justify-start':
        focused,
      'cursor-pointer justify-center py-2 transition-colors hover:bg-indigo-100':
        !focused,
      'absolute left-0 right-0 z-20 min-h-32 w-auto items-center md:left-7 md:right-7 md:min-h-0':
        localFocused,
      'items-end self-stretch lg:mx-auto lg:w-full lg:max-w-2xl':
        !localFocused && focused,
    }"
    :style="localFocused ? buttonStyle : undefined"
    @click="!focused ? focus() : undefined"
    @keyup.escape="localFocused = false"
  >
    <button
      v-if="localFocused"
      ref="$closeButton"
      class="absolute right-1 top-1 rounded-full border-2 border-solid border-transparent hover:border-gray-500"
      @click.stop="localFocused = false"
    >
      <span class="sr-only">Close</span>
      <IconActionDeleteMedium />
    </button>
    <p
      class="shrink-0 overflow-hidden whitespace-nowrap py-1 text-base leading-none"
      :class="{
        'w-full text-left md:w-auto md:min-w-80 md:text-right': focused,
        hidden: !focused,
      }"
    >
      <span class="group mb-2 flex items-center gap-x-2 md:justify-end"
        ><CopyButton class="hidden md:block" :text="iconName" /><code
          class="!m-0 leading-none"
          >{{ iconName }}</code
        ></span
      >
      <span class="group flex items-center gap-x-2 md:justify-end"
        ><CopyButton
          class="hidden md:block"
          :text="`&lt;Icon${upperFirst(camelCase(iconName))}/&gt;`"
        /><code class="!m-0 leading-none"
          >&lt;Icon{{ upperFirst(camelCase(iconName)) }} /&gt;</code
        ></span
      >
    </p>

    <div
      class="grid grow gap-4 transition-all duration-1000"
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
