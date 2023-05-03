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
  meta: Record<string, string[]>
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
// <tw-include class="grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4"/>
</script>

<template>
  <div
    v-if="overlay"
    class="absolute w-full h-full top-0 left-0 z-10 bg-gray-500 transition transition-opacity"
    :class="{
      'opacity-0': buttonStyle.transition === 'none',
      'opacity-70': buttonStyle.transition !== 'none',
    }"
    @click="localFocused = false"
  />
  <div
    v-if="localFocused"
    class="bg-indigo-500 rounded"
    :style="placeholderStyle"
  />
  <div
    ref="$button"
    tabindex="0"
    class="gap-x-[16px] flex flex-wrap items-center overflow-hidden bg-indigo-50 dark:bg-gray-800 min-h-[72px] rounded"
    :class="{
      'mx-[16px] px-[8px] pb-[4px] md:flex-nowrap justify-end md:justify-start !cursor-default':
        focused,
      'py-[8px] justify-center hover:bg-indigo-100 dark:hover:bg-gray-700 transition-colors cursor-pointer':
        !focused,
      'absolute left-0 right-0 md:left-[28px] md:right-[28px] z-20 w-auto items-center min-h-[120px] md:min-h-0':
        localFocused,
      'w-[calc(100%-32px)] lg:w-[700px] mx-auto items-end':
        !localFocused && focused,
    }"
    :style="localFocused ? buttonStyle : undefined"
    @click="!focused ? focus() : undefined"
    @keyup.escape="localFocused = false"
  >
    <button
      v-if="localFocused"
      ref="$closeButton"
      class="absolute top-[4px] right-[4px] rounded-full border-2 border-solid border-transparent hover:border-gray-500 dark:hover:border-gray-500"
      @click.stop="localFocused = false"
    >
      <span class="sr-only">Close</span>
      <IconActionDeleteMedium />
    </button>
    <p
      class="text-[16px] flex-shrink-0 overflow-hidden whitespace-nowrap overflow-hidden py-[4px]"
      :class="{
        'w-full text-left md:text-right md:w-auto md:min-w-[350px]': focused,
        hidden: !focused,
      }"
    >
      <span class="flex items-center md:justify-end mb-[8px] gap-x-[8px] group"
        ><CopyButton class="hidden md:block" :text="iconName" /><code
          class="!m-0"
          >{{ iconName }}</code
        ></span
      >
      <span class="flex items-center md:justify-end gap-x-[8px] group"
        ><CopyButton
          class="hidden md:block"
          :text="`&lt;Icon${upperFirst(camelCase(iconName))}/&gt;`"
        /><code class="!m-0"
          >&lt;Icon{{ upperFirst(camelCase(iconName)) }} /&gt;</code
        ></span
      >
    </p>

    <div
      class="flex-grow grid gap-[16px] transition-all duration-1000"
      :class="{
        [`grid-cols-${Math.min(meta.availableSizes.length, 4)}`]: !localFocused,
        [`grid-cols-5 justify-items-center`]: localFocused,
      }"
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
