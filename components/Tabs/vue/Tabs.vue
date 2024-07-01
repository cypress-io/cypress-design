<script lang="ts" setup>
import {
  type Component,
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'
import {
  SwitchEvent,
  Tab,
  throttle,
  CssVariants,
} from '@cypress-design/constants-tabs'

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
    variant?: keyof typeof CssVariants
  }>(),
  {
    variant: 'default',
  },
)

const $tab = ref<HTMLButtonElement[]>()

const emit = defineEmits<{
  /**
   * A tab is changed
   * use e.preventDefault() to prevent tab change
   * @param tab new tab selected
   */
  (event: 'switch', tab: Tab, evt: SwitchEvent): void
  (event: 'update:activeId', tab: string): void
}>()

defineSlots<{
  /**
   * each tab can be custom rendered as a slot
   */
  tab(props: {
    /**
     * The tab id
     */
    id: string
    /**
     * is the current tab active
     */
    active?: boolean
    /**
     * The tab href
     */
    href?: string
    label: string
    tag?: string
    /**
     * If you specify only an `icon` it will be displayed before the label
     */
    icon: Component
    /**
     * If you specify both an iconBefore and an iconAfter, the iconBefore
     * will be displayed before the label
     * The `icon` prop will be ignored if you specify both with an iconBefore
     */
    iconBefore: Component
    /**
     * Icon to display after the label
     */
    iconAfter: Component
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }): any
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
  const switchEvent = new SwitchEvent()
  emit('switch', props.tabs[nextIndex], switchEvent)
  if (switchEvent.defaultPrevented) return
  activeId.value = props.tabs[nextIndex].id
  $tab.value?.[nextIndex]?.focus()
  emit('update:activeId', props.tabs[nextIndex].id)
}

const classes = computed(() => {
  if (props.variant in CssVariants) {
    return CssVariants[props.variant].classes
  }
  return CssVariants.default.classes
})

const iconProps = computed(() => {
  if (props.variant in CssVariants) {
    return CssVariants[props.variant].icon
  }
  return CssVariants.default.icon
})
</script>

<template>
  <div role="tablist" :class="classes.wrapper">
    <div v-if="'subWrapper' in classes" :class="classes.subWrapper" />
    <component
      :is="href ? 'a' : 'button'"
      v-for="{
        id,
        href,
        label,
        tag,
        icon,
        iconBefore,
        iconAfter,
        ...rest
      } in tabs"
      :id="id"
      :key="id"
      ref="$tab"
      :href="href"
      role="tab"
      :tabindex="id === activeId ? undefined : -1"
      :aria-selected="id === activeId ? true : false"
      :class="[
        classes.button,
        {
          [classes.activeStatic]: id === activeId && !activeMarkerStyle,
          [classes.active]: id === activeId,
          [classes.inActive]: id !== activeId,
        },
      ]"
      v-bind="rest"
      @click="
        (e: MouseEvent) => {
          if (e.ctrlKey || e.metaKey) return
          e.preventDefault()
          const switchEvent = new SwitchEvent()
          emit(
            'switch',
            {
              id,
              href,
              label,
              tag,
              icon,
              iconBefore,
              iconAfter,
              ...rest,
            },
            switchEvent,
          )
          if (switchEvent.defaultPrevented) return
          activeId = id
        }
      "
      @keyup.left="navigate(-1)"
      @keyup.right="navigate(1)"
    >
      <!-- @slot render a tab with a custom scoped slot -->
      <slot
        name="tab"
        v-bind="{
          id,
          href,
          label,
          tag,
          icon,
          iconBefore,
          iconAfter,
          ...rest,
        }"
      >
        <component
          :is="iconBefore ?? icon"
          v-if="iconBefore ?? icon"
          v-bind="iconProps"
          class="mr-[8px]"
        />
        {{ label }}
        <div
          v-if="tag"
          :class="{ [classes.tag]: true, [classes.tagActive]: id === activeId }"
        >
          {{ tag }}
        </div>
        <component
          :is="iconAfter"
          v-if="iconAfter"
          v-bind="iconProps"
          class="ml-[8px]"
        />
      </slot>
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
