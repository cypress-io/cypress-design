<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { Tab, throttle, variants } from '@cypress-design/constants-tabs'

const props = withDefaults(
  defineProps<{
    /**
     * The tabs to display
     */
    tabs: Tab[]
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
  },
)

const $tab = ref<HTMLButtonElement[]>()

const emit = defineEmits<{
  /**
   * A tab is changed
   * @param tab new tab selected
   */
  (event: 'switch', tab: Tab): void
  (event: 'update:activeId', tab: string): void
}>()

const activeId = ref(props.activeId ?? props.tabs.find((tab) => tab.active)?.id)

watch(
  () => props.activeId,
  (id) => {
    activeId.value = id
  },
)

const activeMarkerStyle = ref<
  { left?: string; width?: string; transitionProperty?: string } | undefined
>()

function updateActiveMarkerStyle() {
  const activeIndex = props.tabs.findIndex((tab) => tab.id === activeId.value)
  if (activeIndex > -1) {
    const activeTab = $tab.value?.[activeIndex]
    if (activeTab) {
      activeMarkerStyle.value = {
        ...activeMarkerStyle.value,
        left: `${activeTab.offsetLeft}px`,
        width: `${activeTab.offsetWidth}px`,
      }
    }
  }
}

const throttledUpdateActiveMarkerStyle = throttle(updateActiveMarkerStyle, 100)

onMounted(() => {
  watch(
    activeId,
    () => {
      updateActiveMarkerStyle()
    },
    { immediate: true },
  )

  // Only start animation after the first render
  nextTick(() => {
    activeMarkerStyle.value = {
      ...activeMarkerStyle.value,
      transitionProperty: 'left, width',
    }
  })
})

onMounted(() => {
  window.addEventListener('resize', throttledUpdateActiveMarkerStyle)
})

onUnmounted(() => {
  window.removeEventListener('resize', throttledUpdateActiveMarkerStyle)
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
  $tab.value?.[nextIndex]?.focus()
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
  <div role="tablist" :class="classes.wrapper">
    <div v-if="'subWrapper' in classes" :class="classes.subWrapper" />
    <component
      v-for="{
        id,
        href,
        label,
        tag,
        icon,
        iconBefore,
        iconAfter,
        ...dataAttr
      } in tabs"
      :key="id"
      :is="href ? 'a' : 'button'"
      :href="href"
      ref="$tab"
      role="tab"
      :tabindex="id === activeId ? undefined : -1"
      :aria-selected="id === activeId ? true : undefined"
      :class="[
        classes.button,
        {
          [classes.activeStatic]: id === activeId && !activeMarkerStyle,
          [classes.active]: id === activeId,
          [classes.inActive]: id !== activeId,
        },
      ]"
      v-bind="dataAttr"
      @click="
        (e: MouseEvent) => {
          if (e.ctrlKey || e.metaKey) return
          e.preventDefault()
          activeId = id
          emit('switch', {
            id,
            href,
            label,
            tag,
            icon,
            iconBefore,
            iconAfter,
            ...dataAttr,
          })
        }
      "
      @keyup.left="navigate(-1)"
      @keyup.right="navigate(1)"
    >
      <component
        v-if="iconBefore ?? icon"
        :is="iconBefore ?? icon"
        v-bind="iconProps"
        class="mr-[8px]"
      />
      {{ label }}
      <div v-if="tag" :class="classes.tag">{{ tag }}</div>
      <component
        v-if="iconAfter"
        :is="iconAfter"
        v-bind="iconProps"
        class="ml-[8px]"
      />
      <div
        v-if="id === activeId && !activeMarkerStyle"
        :class="classes.activeMarkerStatic"
      />
    </component>
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
</template>
