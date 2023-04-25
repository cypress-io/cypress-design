<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue'
import Icon, { IconActionDeleteMedium } from '@cypress-design/vue-icon'
import _ from 'lodash'
import CopyButton from './CopyButton.vue'

const { upperFirst, camelCase } = _

const props = defineProps<{
  iconName: string
  groupName: string
  meta: Record<string, string[]>
  focused: boolean
}>()

const localFocused = ref(false)

const focused = computed(() => props.focused || localFocused.value)

const IconAny = Icon as any

const placeholderStyle = ref({
  width: '1px',
  height: '1px',
  top: '0',
  left: '0',
})

const buttonStyle = ref({
  top: '0',
  height: '0',
})

function focus() {
  placeholderStyle.value = {
    top: `${$button.value?.offsetTop}px`,
    height: `${$button.value?.offsetHeight}px`,
    width: `${$button.value?.offsetWidth}px`,
    left: `${$button.value?.offsetLeft}px`,
  }
  buttonStyle.value = {
    top: `${($button.value?.offsetTop ?? 0) + 4}px`,
    height: `${($button.value?.offsetHeight ?? 0) - 8}px`,
  }
  nextTick(() => {
    localFocused.value = true
  })
}

const $button = ref<HTMLDivElement>()
</script>

<template>
  <div
    v-if="localFocused"
    class="absolute w-full h-full top-0 left-0 z-10 bg-gray-500/70"
    @click="localFocused = false"
  />
  <div
    v-if="localFocused"
    class="bg-indigo-500 rounded"
    :style="placeholderStyle"
  />
  <div
    ref="$button"
    class="gap-x-[16px] flex flex-wrap overflow-hidden bg-indigo-50 dark:bg-gray-800"
    :class="{
      'mx-[16px] px-[8px] pb-[4px] rounded md:flex-nowrap justify-end md:justify-start':
        focused,
      'rounded py-[8px] justify-center': !focused,
      'absolute left-0 right-0 md:left-[28px] md:right-[28px] z-20 w-auto items-center min-h-[120px] md:min-h-0':
        localFocused,
      'w-[calc(100%-32px)] lg:w-[700px] mx-auto items-end':
        !localFocused && focused,
    }"
    :style="localFocused ? buttonStyle : undefined"
  >
    <button
      v-if="localFocused"
      class="absolute top-[4px] right-[4px] rounded-full border-2 border-solid border-transparent hover:border-gray-500 dark:hover:border-gray-500"
      @click="localFocused = false"
    >
      <IconActionDeleteMedium />
    </button>
    <p
      class="text-[16px] flex-shrink-0 overflow-hidden whitespace-nowrap overflow-hidden py-[4px]"
      :class="{
        'w-full text-left md:text-right md:w-auto md:min-w-[300px]': focused,
        hidden: !focused,
      }"
    >
      <span class="flex items-center md:justify-end mb-[8px] gap-x-[8px] group"
        ><CopyButton :text="iconName" /><code>{{ iconName }}</code></span
      >
      <span class="flex items-center md:justify-end gap-x-[8px] group"
        ><CopyButton
          :text="`&lt;Icon${upperFirst(camelCase(iconName))}/&gt;`"
        /><code>&lt;Icon{{ upperFirst(camelCase(iconName)) }} /&gt;</code></span
      >
    </p>
    <button
      v-for="size in meta.availableSizes"
      :key="size"
      class="flex gap-[8px] items-end group"
      @click="focus()"
    >
      <div
        class="py-[4px] min-w-[32px] flex flex-col items-center gap-x-[16px] gap-y-[4px] justify-end"
        :class="{
          'pl-[4px] border-l border-gray-300': focused,
          'px-[8px] md:px-[4px] md:w-[164px]': !focused,
        }"
      >
        <IconAny :name="iconName" :size="size" />
        <p class="text-gray-500 text-[12px]">
          <span v-if="!focused">{{
            iconName.slice(groupName.length + 1)
          }}</span>
          {{ size }}
        </p>
      </div>
      <div
        v-if="focused"
        :key="`${iconName}_${size}`"
        class="text-center text-teal-500"
      >
        <div v-if="meta.hasStrokeColor && meta.hasStrokeColor.includes(size)">
          s
        </div>
        <div v-if="meta.hasFillColor && meta.hasFillColor.includes(size)">
          f
        </div>
        <div
          v-if="
            meta.hasSecondaryStrokeColor &&
            meta.hasSecondaryStrokeColor.includes(size)
          "
        >
          s+
        </div>
        <div
          v-if="
            meta.hasSecondaryFillColor &&
            meta.hasSecondaryFillColor.includes(size)
          "
        >
          f+
        </div>
      </div>
    </button>
  </div>
</template>
