<template>
  <div ref="reference" @mouseover="placeTooltip" @focus="placeTooltip" @blur="show = false" @mouseout="show = false">
    <slot />
    <teleport to="#portal-target">
      <div v-if="!disabled" @mouseover="tooltipHovered = true" @mouseout="tooltipHovered = false" role="tooltip"
        ref="tooltip" :style="positionComputed ? `top:${top}px!important;left:${left}px!important;` : undefined"
        class="absolute p-16px" :class="{
          'invisible': !show && positionComputed && !tooltipHovered,
          '-top-10000px invisible': !positionComputed,
        }">
        <div class="rounded shadow border p-8px text-16px leading-24px min-w-160px text-center" :class="{
          'bg-white text-gray-900 border-gray-100 shadow-gray-100': props.color === 'light',
          'bg-gray-900 text-white shadow-gray-800 border-gray-800': props.color === 'dark',
        }">
          <svg ref="arrowRef" viewBox="0 0 48 48" width="24" height="24" class="absolute z-10" :class="{
            'stroke-gray-100 fill-white': props.color === 'light',
            'stroke-gray-800 fill-gray-900': props.color === 'dark',
          }"
            :style="`transform: rotate(${arrowRotate}deg); filter: ${dropShadowFilter};${arrowYRule}:${arrowTop}px!important;${arrowXRule}:${arrowLeft}px!important;`"
            fill="none">
            <rect x=" 0" y="0" width="48" height="4" stroke-width="0" />
            <path d="M 0 3 C 12 3 18 18 24 18 C 30 18 36 3 48 3" stroke-width="2" />
          </svg>
          <slot name="popper" />
        </div>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
import type { Placement, Side } from '@floating-ui/dom';
import { computePosition, flip, offset, arrow } from '@floating-ui/dom';
import type { Ref } from 'vue';
import { ref, onBeforeMount } from 'vue';

const props = withDefaults(
  defineProps<{
    /**
     * Where the tooltip should be placed relative to the target.
     */
    placement?: Placement
    /**
     * background color of the tooltip.
     */
    color?: 'light' | 'dark'
    /**
     * Disable the tooltip.
     * This hides the popper and makes the tooltip inactive.
     */
    disabled?: boolean
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
  right: 90
} as const

onBeforeMount(async () => {
  await getTarget()
})

async function getTarget() {
  let portalTargetLocal = document.getElementById("portal-target")
  if (!portalTargetLocal) {
    portalTargetLocal = document.createElement("div");
    portalTargetLocal.id = "portal-target";
    document.body.appendChild(portalTargetLocal)
  }
  portalTarget.value = portalTargetLocal
}

async function placeTooltip() {
  if (props.disabled || !reference.value || !tooltip.value || !arrowRef.value) return
  const { x, y, placement, middlewareData: { arrow: { x: arrowX, y: arrowY } = {} }, } = await computePosition(reference.value, tooltip.value, {
    placement: props.placement,
    middleware: [
      flip(),
      offset(0),
      arrow({ element: arrowRef.value, padding: 24 })
    ],
  })
  left.value = x
  top.value = y
  const placementSide = placement.split('-')[0] as Side
  arrowRotate.value = ROTATE_MAP[placementSide]

  dropShadowFilter.value = placementSide === 'bottom' || props.color === 'dark'
    ? undefined
    : 'drop-shadow(0 1px 1px rgba(225, 227, 237, .8))'

  if (arrowX && arrowY) {
    arrowLeft.value = arrowX
    arrowTop.value = arrowY
    arrowXRule.value = 'left'
    arrowYRule.value = 'top'
  } else if (arrowX) {
    arrowLeft.value = arrowX
    arrowTop.value = -6
    arrowXRule.value = 'left'
    arrowYRule.value = placementSide === 'top' ? 'bottom' : 'top'
  } else if (arrowY) {
    arrowTop.value = arrowY
    arrowLeft.value = -6
    arrowXRule.value = placementSide === 'left' ? 'right' : 'left'
    arrowYRule.value = 'top'
  }
  positionComputed.value = true
  placementSideFinal.value = placementSide

  show.value = true
}
</script>
