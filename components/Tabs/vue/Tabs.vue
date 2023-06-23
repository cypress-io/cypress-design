<script lang="ts" setup>
import {
  computed,
  nextTick,
  onBeforeMount,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'
import {
  Tab as TabConfig,
  variants,
  overflowContainerClass,
} from '@cypress-design/constants-tabs'
import useTooltips from '@cypress-design/place-floating-vue'
import { IconMenuDotsVertical } from '@cypress-design/vue-icon'
import Tab from './_Tab.vue'

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
const $overflowContainer = ref<HTMLDivElement | null>(null)
const $overflowButton = ref<HTMLButtonElement | null>(null)
const $overflowMenu = ref<HTMLDivElement | null>(null)
const $arrowRef = ref<HTMLElement | null>(null)

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
  | {
      left?: string
      width?: string
      transitionProperty?: string
    }
  | undefined
>()

const activeTab = computed(() => {
  const activeIndex = props.tabs.findIndex((tab) => tab.id === activeId.value)
  if (activeIndex > -1) {
    const activeTab = $tab.value?.[activeIndex]?.$el as HTMLElement
    return activeTab
  }
})

const activeIndex = computed(() =>
  props.tabs.findIndex((tab) => tab.id === activeId.value)
)

const firstVisibleIndex = ref(10000)

function calcFirstVisibleTabIndex() {
  if ($tab.value) {
    // find the index of the first element
    // visible in the overflow container
    const containerRect = $overflowContainer.value?.getBoundingClientRect()
    const cloneTabReversed = [...$tab.value].reverse()
    const reverseIndex = cloneTabReversed.findIndex((tab) => {
      return tab.$el.getBoundingClientRect().right < (containerRect?.right ?? 0)
    })
    firstVisibleIndex.value = props.tabs.length - reverseIndex
  }
}

onUnmounted(() => {
  window.removeEventListener('resize', calcFirstVisibleTabIndex)
})

onMounted(() => {
  calcFirstVisibleTabIndex()

  window.addEventListener('resize', calcFirstVisibleTabIndex)

  watch(
    () => props.tabs,
    () => {
      calcFirstVisibleTabIndex()
    },
    { deep: true }
  )

  watch(
    activeTab,
    (activeTab) => {
      if (activeTab) {
        // get active tab index

        if (activeIndex.value >= firstVisibleIndex.value) {
          // we need to wait for the button to appear
          // before knowing its position
          nextTick(() => {
            const activeButton = $overflowButton.value
            if (activeButton) {
              activeMarkerStyle.value = {
                ...activeMarkerStyle.value,
                left: `${activeButton.offsetLeft}px`,
                width: `${activeButton.offsetWidth}px`,
              }
            }
          })
        } else {
          activeMarkerStyle.value = {
            ...activeMarkerStyle.value,
            left: `${activeTab.offsetLeft}px`,
            width: `${activeTab.offsetWidth}px`,
          }
        }
      }
    },
    { immediate: true }
  )

  // Only start animation after the first render
  nextTick(() => {
    activeMarkerStyle.value = {
      ...activeMarkerStyle.value,
      transitionProperty: 'left, width',
    }
  })
})

const {
  placeTooltip,
  show: showOverflowMenu,
  arrowStyle,
  tooltipStyle,
  positionComputed,
} = useTooltips({
  reference: $overflowButton,
  tooltip: $overflowMenu,
  arrowRef: $arrowRef,
  props: {
    placement: 'bottom-end',
  },
})

const visibleTabs = computed(() => props.tabs.slice(0, firstVisibleIndex.value))
const dropdownTabs = computed(() => props.tabs.slice(firstVisibleIndex.value))

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

onBeforeMount(async () => {
  await getTarget()
})

async function getTarget() {
  let portalTargetLocal = document.getElementById('portal-target')
  if (!portalTargetLocal) {
    portalTargetLocal = document.createElement('div')
    portalTargetLocal.id = 'portal-target'
    portalTargetLocal.style.position = 'absolute'
    portalTargetLocal.style.top = '0'
    portalTargetLocal.style.left = '0'
    portalTargetLocal.style.zIndex = '10000'
    document.body.appendChild(portalTargetLocal)
  }
}
</script>

<template>
  <div ref="$overflowContainer" :class="overflowContainerClass">
    <div role="tablist" :class="classes.wrapper">
      <Tab
        v-for="tab in visibleTabs"
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
      <button
        v-if="firstVisibleIndex < tabs.length - 1"
        ref="$overflowButton"
        :class="[
          'w-[24px] h-[24px] flex items-center justify-center rounded',
          {
            [classes.inActive]: activeIndex <= firstVisibleIndex,
            [classes.active]: activeIndex > firstVisibleIndex,
          },
        ]"
        @click="placeTooltip()"
      >
        <IconMenuDotsVertical />
      </button>

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
    <teleport v-if="firstVisibleIndex < tabs.length - 1" to="#portal-target">
      <div
        ref="$overflowMenu"
        class="w-[300px] absolute border border-gray-100 rounded bg-white shadow-lg"
        :class="{
          invisible: !showOverflowMenu && positionComputed,
          '-top-[10000px] invisible': !positionComputed,
        }"
        :style="tooltipStyle"
      >
        <svg
          ref="$arrowRef"
          viewBox="0 0 48 24"
          width="24"
          height="12"
          class="absolute z-10 stroke-gray-100 fill-white"
          :style="arrowStyle"
          fill="none"
        >
          <rect
            x="0"
            y="-4"
            width="48"
            height="8"
            stroke-width="0"
            stroke-color="red"
          />
          <path
            d="M 0 3 C 12 3 18 18 24 18 C 30 18 36 3 48 3"
            stroke-width="2"
          />
        </svg>
        <button
          v-for="tab in dropdownTabs"
          class="block px-[16px] py-[8px] relative"
          @click="
            (e: MouseEvent) => {
              if(e.ctrlKey || e.metaKey) return
              e.preventDefault()
              activeId = tab.id
              emit('switch', tab)
            }"
        >
          {{ tab.label }}

          <div v-if="tab.id === activeId" :class="classes.activeMarkerStatic" />
        </button>
      </div>
    </teleport>
  </div>
</template>
