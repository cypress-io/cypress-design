<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import {
  Tab as TabConfig,
  variants,
  overflowContainerClass,
} from '@cypress-design/constants-tabs'
import Tab from './Tab.vue'

const props = withDefaults(
  defineProps<{
    /**
     * The tabs to display
     */
    tabs: TabConfig[]
    /**
     * The active tab
     */
    activeId?: string
    /**
     * Appearance of tabs
     */
    variant?: keyof typeof variants
  }>(),
  {
    variant: 'default',
  }
)

const $tab = ref<(typeof Tab)[]>()
const $overflowContainer = ref<HTMLDivElement>()

const emit = defineEmits<{
  /**
   * A tab is changed
   * @param tab new tab selected
   */
  (event: 'switch', tab: TabConfig): void
  (event: 'update:activeId', tab: string): void
}>()

const activeId = ref(props.activeId ?? props.tabs.find((tab) => tab.active)?.id)

watch(
  () => props.activeId,
  (id) => {
    activeId.value = id
  }
)

const activeMarkerStyle = ref<
  { left?: string; width?: string; transitionProperty?: string } | undefined
>()

const activeTab = computed(() => {
  const activeIndex = props.tabs.findIndex((tab) => tab.id === activeId.value)
  if (activeIndex > -1) {
    const activeTab = $tab.value?.[activeIndex]?.$el as HTMLElement
    return activeTab
  }
})
onMounted(() => {
  watch(
    activeTab,
    (activeTab) => {
      if (activeTab) {
        activeMarkerStyle.value = {
          ...activeMarkerStyle.value,
          left: `${activeTab.offsetLeft}px`,
          width: `${activeTab.offsetWidth}px`,
        }
      }
    },
    { immediate: true }
  )

  if ($overflowContainer.value && activeTab.value) {
    // Scroll to active tab if it is not visible
    const overflowContainer = $overflowContainer.value
    const leftBoundary =
      overflowContainer.offsetWidth / 2 - activeTab.value.offsetWidth / 2

    if (activeTab.value.offsetLeft > leftBoundary) {
      overflowContainer.scrollTo({
        left: activeTab.value.offsetLeft - leftBoundary,
      })
    }
  }

  // Only start animation after the first render
  nextTick(() => {
    activeMarkerStyle.value = {
      ...activeMarkerStyle.value,
      transitionProperty: 'left, width',
    }
  })
})

function navigate(shift: number) {
  const shiftedIndex =
    props.tabs.findIndex((tab) => tab.id === activeId.value) + shift
  const nextIndex =
    shiftedIndex < 0
      ? props.tabs.length - 1
      : shiftedIndex >= props.tabs.length
      ? 0
      : shiftedIndex
  activeId.value = props.tabs[nextIndex].id
  $tab.value?.[nextIndex]?.$el.focus()
  emit('update:activeId', props.tabs[nextIndex].id)
  emit('switch', props.tabs[nextIndex])
}

const classes = computed(() => {
  if (props.variant in variants) {
    return variants[props.variant].classes
  }
  return variants.default.classes
})

const iconProps = computed(() => {
  if (props.variant in variants) {
    return variants[props.variant].icon
  }
  return variants.default.icon
})
</script>

<template>
  <div ref="$overflowContainer" :class="overflowContainerClass">
    <div role="tablist" :class="classes.wrapper">
      <Tab
        v-for="tab in tabs"
        :key="tab.id"
        ref="$tab"
        :iconProps="iconProps"
        :activeMarkerStyle="!!activeMarkerStyle"
        :classes="classes"
        :tab="tab"
        :activeId="activeId"
        @back="navigate(-1)"
        @forward="navigate(1)"
        @click="
        (e: MouseEvent) => {
          if(e.ctrlKey || e.metaKey) return
          e.preventDefault()
          activeId = tab.id
          emit('switch', tab)
        }"
      />
      <template v-if="activeMarkerStyle">
        <div
          :class="[classes.activeMarker, classes.activeMarkerColor]"
          :style="activeMarkerStyle"
        />
        <div
          :class="[classes.activeMarker, classes.activeMarkerBlender]"
          :style="activeMarkerStyle"
        />
      </template>
    </div>
  </div>
</template>
