<template>
  <div class="group">
    <div ref="reference" @mouseover="placeTooltip">
      <slot />
    </div>
    <div role="tooltip" ref="tooltip"
      :style="positionComputed ? `top:${top}px!important;left:${left}px!important;` : undefined"
      class="absolute bg-white rounded shadow shadow-gray-100 border border-gray-100 p-8px text-16px leading-24px min-w-160px text-center"
      :class="{
        'hidden group-hover:block': positionComputed,
        '-top-10000px': !positionComputed
      }">
      <svg ref="arrowRef" viewPort="0 0 24 12" width="24" height="16" class="absolute stroke-gray-100 fill-white"
        :style="`transform: rotate(${arrowRotate}deg); filter: drop-shadow(0 -2px 1px rgba(225, 227, 237, .5));${arrowYRule}:${arrowTop}px!important;${arrowXRule}:${arrowLeft}px!important;`"
        fill="none">
        <line x1="0" y1="11.5" x2="22" y2="11.5" stroke="white" stroke-width="2" />
        <path d="M 0 10.5 C 6 10.5 9 2 12 2 C 15 2 18 10.5 24 10.5" />
      </svg>
      <slot name="popper" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Placement, Side } from '@floating-ui/dom';
import { computePosition, flip, offset, arrow, shift } from '@floating-ui/dom';
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

const ROTATE_MAP = {
  top: 180,
  right: 270,
  bottom: 0,
  left: 90
}

const COLOR_MAP = {
  light: '#fff',
  dark: '#000'
}

async function placeTooltip() {
  if (!reference.value || !tooltip.value || !arrowRef.value) return
  const { x, y, placement, middlewareData } = await computePosition(reference.value, tooltip.value, {
    placement: props.placement,
    middleware: [
      flip(),
      offset(28),
      arrow({ element: arrowRef.value, padding: 8 })
    ],
  })
  left.value = x
  top.value = y
  const placementSide = placement.split('-')[0] as Side
  arrowRotate.value = ROTATE_MAP[placementSide]

  if (middlewareData.arrow?.x && middlewareData.arrow?.y) {
    arrowLeft.value = middlewareData.arrow.x
    arrowTop.value = middlewareData.arrow.y
    arrowXRule.value = 'left'
    arrowYRule.value = 'top'
  } else if (middlewareData.arrow?.x) {
    arrowLeft.value = middlewareData.arrow.x
    arrowTop.value = -11
    arrowXRule.value = 'left'
    arrowYRule.value = placementSide === 'top' ? 'bottom' : 'top'
  } else if (middlewareData.arrow?.y) {
    arrowTop.value = middlewareData.arrow.y
    arrowLeft.value = -15
    arrowXRule.value = placementSide === 'left' ? 'right' : 'left'
    arrowYRule.value = 'top'
  }
  positionComputed.value = true
}
</script>
