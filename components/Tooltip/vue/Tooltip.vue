<script lang="ts" setup>
import type { Placement, Side } from '@floating-ui/dom'
import useTooltips from './useTooltip'
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
const tooltipHovered = ref(false)

const { placeTooltip, positionComputed, show, arrowStyle, tooltipStyle } =
  useTooltips({
    reference,
    tooltip,
    arrowRef,
    props,
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
    if (show.value && !props.disabled) {
      placeTooltip()
    }
  }
)
</script>

<template>
  <div
    v-bind="$attrs"
    ref="reference"
    @mouseover="props.disabled ? null : placeTooltip()"
    @focus="props.disabled ? null : placeTooltip()"
    @blur="show = false"
    @mouseout="show = false"
  >
    <!-- @slot element to hover on to open the tooltip -->
    <slot />
    <teleport v-if="!disabled" to="#portal-target">
      <div
        @mouseover="tooltipHovered = true"
        @mouseout="tooltipHovered = false"
        role="tooltip"
        ref="tooltip"
        :style="tooltipStyle"
        class="absolute"
        :class="[
          {
            invisible:
              !show &&
              positionComputed &&
              !(tooltipHovered && props.interactive),
            '-top-[10000px] invisible': !positionComputed,
          },
          props.interactive ? 'p-[16px]' : undefined,
        ]"
      >
        <div
          class="border rounded shadow"
          :class="[colors.background, colors.block]"
        >
          <svg
            ref="arrowRef"
            viewBox="0 0 48 24"
            width="24"
            height="12"
            class="absolute z-10"
            :class="colors.svg"
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
          <div
            class="rounded text-[16px] leading-[24px] min-w-[160px] text-center p-[8px] relative z-20"
            :class="colors.background"
          >
            <!-- @slot content of the tooltip -->
            <slot name="popper" />
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>
