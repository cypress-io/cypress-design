<template>
  <div class="group" @focus="placeTooltip">
    <div ref="reference" @mouseover="placeTooltip">
      <slot />
    </div>
    <div role="tooltip" ref="tooltip"
      :style="positionComputed ? `top:${top}px!important;left:${left}px!important;` : undefined" class="absolute p-16px"
      :class="{
        'hidden group-hover:block group-focus:block': positionComputed,
        '-top-10000px invisible': !positionComputed,
      }">
      <div class="rounded shadow border p-8px text-16px leading-24px min-w-160px text-center" :class="{
        'bg-white border-gray-100 shadow-gray-100': props.color === 'light',
        'bg-gray-900 shadow-gray-800 border-gray-800': props.color === 'dark',
      }">
        <svg ref="arrowRef" viewBox="0 0 48 24" width="24" height="12" class="absolute" :class="{
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
  </div>
</template>

<script lang="ts" setup>
import type { Placement, Side } from '@floating-ui/dom';
import { computePosition, flip, offset, arrow } from '@floating-ui/dom';
import { ref, type Ref } from 'vue';

const props = withDefaults(
  defineProps<{
    placement?: Placement
    color?: 'light' | 'dark'
  }>(),
  {
    color: 'light'
  }
)

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

const ROTATE_MAP = {
  bottom: 180,
  left: 270,
  top: 0,
  right: 90
} as const

async function placeTooltip() {
  if (!reference.value || !tooltip.value || !arrowRef.value) return
  const { x, y, placement, middlewareData: { arrow: { x: arrowX, y: arrowY } = {} }, } = await computePosition(reference.value, tooltip.value, {
    placement: props.placement,
    middleware: [
      flip(),
      offset(16),
      arrow({ element: arrowRef.value, padding: 8 })
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
    arrowTop.value = 6
    arrowXRule.value = 'left'
    arrowYRule.value = placementSide === 'top' ? 'bottom' : 'top'
  } else if (arrowY) {
    arrowTop.value = arrowY
    arrowLeft.value = 0
    arrowXRule.value = placementSide === 'left' ? 'right' : 'left'
    arrowYRule.value = 'top'
  }
  positionComputed.value = true
  placementSideFinal.value = placementSide
}
</script>
