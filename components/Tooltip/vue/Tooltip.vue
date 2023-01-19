<template>
  <div
    v-bind="$attrs"
    ref="reference"
    @mouseover="placeTooltip"
    @focus="placeTooltip"
    @blur="show = false"
    @mouseout="show = false"
  >
    <slot />
  </div>
  <teleport v-if="!disabled" to="#portal-target">
    <div
      @mouseover="tooltipHovered = true"
      @mouseout="tooltipHovered = false"
      role="tooltip"
      ref="tooltip"
      :style="
        positionComputed
          ? `top:${top}px!important;left:${left}px!important;`
          : undefined
      "
      class="absolute"
      :class="[
        {
          invisible:
            !show && positionComputed && !(tooltipHovered && props.interactive),
          '-top-10000px invisible': !positionComputed,
        },
        props.interactive ? 'p-16px' : undefined,
      ]"
    >
      <div
        class="rounded shadow border"
        :class="[colors.background, colors.block]"
      >
        <svg
          ref="arrowRef"
          viewBox="0 0 48 24"
          width="24"
          height="12"
          class="absolute z-10"
          :class="colors.svg"
          :style="`
              transform: rotate(${arrowRotate}deg); 
              filter: ${dropShadowFilter};
              ${arrowYRule}:${arrowTop}px!important;
              ${arrowXRule}:${arrowLeft}px!important;`"
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
        <div
          class="rounded text-16px leading-24px min-w-160px text-center p-8px relative z-20"
          :class="colors.background"
        >
          <slot name="popper" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import type { Placement, Side } from '@floating-ui/dom'
import { computePosition, flip, offset, arrow } from '@floating-ui/dom'
import type { Ref } from 'vue'
import { watch, computed, ref, onBeforeMount } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * Where the tooltip should be placed relative to the target.
     */
    placement?: Placement
    /**
     * Background color of the tooltip.
     */
    color?: 'light' | 'dark'
    /**
     * Disable the tooltip.
     * This hides the popper and makes the tooltip inactive.
     */
    disabled?: boolean
    /**
     * If true, the tooltip will be hidden when hovering the popper/tooltip
     */
    interactive?: boolean
    /**
     * If set, the tooltip will always respect the given placement
     */
    forcePlacement?: boolean
  }>(),
  {
    color: 'light',
  }
)

const portalTarget: Ref<HTMLElement | null> = ref(null)
const reference: Ref<HTMLElement | null> = ref(null)
const tooltip: Ref<HTMLElement | null> = ref(null)
const arrowRef: Ref<HTMLElement | null> = ref(null)
const left = ref(0)
const top = ref(0)
const arrowLeft = ref(0)
const arrowTop = ref(0)
const arrowRotate = ref(0)
const arrowXRule: Ref<'left' | 'right'> = ref('left')
const arrowYRule: Ref<'top' | 'bottom'> = ref('top')
const positionComputed = ref(false)
const dropShadowFilter: Ref<string | undefined> = ref(undefined)
const placementSideFinal = ref(props.placement)
const show = ref(false)
const tooltipHovered = ref(false)

const ROTATE_MAP = {
  bottom: 180,
  left: 270,
  top: 0,
  right: 90,
} as const

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
  portalTarget.value = portalTargetLocal
}

const colors = computed(() => {
  switch (props.color) {
    case 'light':
      return {
        svg: 'stroke-none fill-white',
        block: 'text-gray-900 shadow-gray-100 border-transparent',
        background: 'bg-white',
      }
    case 'dark':
      return {
        svg: 'stroke-none fill-gray-900',
        block: 'text-white shadow-gray-800 border-transparent',
        background: 'bg-gray-900',
      }
    default:
      return {}
  }
})

watch(
  () => props.interactive,
  () => {
    if (show.value) {
      placeTooltip()
    }
  }
)

async function placeTooltip() {
  if (props.disabled || !reference.value || !tooltip.value || !arrowRef.value)
    return
  const {
    x,
    y,
    placement,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = await computePosition(reference.value, tooltip.value, {
    placement: props.placement,
    middleware: [
      props.forcePlacement
        ? {
            name: 'no-flip',
            fn: (obj) => obj,
          }
        : flip(),
      offset(props.interactive ? 0 : 16),
      arrow({ element: arrowRef.value, padding: 24 }),
    ],
  })
  const placementSide = placement.split('-')[0] as Side
  left.value = x
  top.value = y
  arrowRotate.value = ROTATE_MAP[placementSide]

  dropShadowFilter.value =
    placementSide === 'bottom' || props.color === 'dark'
      ? 'drop-shadow(0 1px 1px rgba(225, 227, 237, .3))'
      : 'drop-shadow(0 1px 1px rgba(225, 227, 237, .8))'

  if (arrowX && arrowY) {
    arrowLeft.value = arrowX
    arrowTop.value = arrowY
    arrowXRule.value = 'left'
    arrowYRule.value = 'top'
  } else if (arrowX) {
    arrowLeft.value = arrowX
    arrowTop.value = props.interactive ? 6 : -10
    arrowXRule.value = 'left'
    arrowYRule.value = placementSide === 'top' ? 'bottom' : 'top'
  } else if (arrowY) {
    arrowTop.value = arrowY + 4
    arrowLeft.value = props.interactive ? 0 : -16
    arrowXRule.value = placementSide === 'left' ? 'right' : 'left'
    arrowYRule.value = 'top'
  }
  positionComputed.value = true
  placementSideFinal.value = placementSide

  show.value = true
}
</script>
