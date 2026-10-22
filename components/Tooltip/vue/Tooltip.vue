<script lang="ts">
let idCounter = 0
</script>

<script lang="ts" setup>
import type {
  Placement,
  Side,
  OffsetOptions,
  ShiftOptions,
} from '@floating-ui/dom'
import { computePosition, flip, offset, arrow, shift } from '@floating-ui/dom'
import type { Ref } from 'vue'
import * as Vue from 'vue'
import {
  watch,
  computed,
  ref,
  nextTick,
  onBeforeMount,
  onMounted,
  useAttrs,
} from 'vue'

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
    /**
     * If true, the tooltip will be open.
     */
    open?: boolean
    /**
     * The padding between the arrow and the edges of the floating element. The default is 24px
     */
    arrowPadding?: number
    /**
     * Options for shifting the floating element to keep it in view. The default is `{ padding: 16 }`
     */
    shiftOptions?: ShiftOptions
    /**
     * Options for translating the floating element along the specified axes.
     * The default is 16px
     */
    offsetOptions?: OffsetOptions | number
  }>(),
  {
    color: 'light',
    arrowPadding: 24,
    shiftOptions: () => ({ padding: 16 }),
    offsetOptions: 16,
  },
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
const keyboardOpen = ref(false)
const mounted = ref(false)
const lastTrigger: Ref<HTMLElement | null> = ref(null)

// `useId` keeps ids stable across SSR and hydration, but it only exists from Vue 3.5
const tooltipId = `cy-tooltip-${
  (Vue as unknown as { useId?: () => string }).useId?.() ?? `${++idCounter}`
}`

const describedBy = computed(() =>
  mounted.value && !props.disabled && tooltip.value ? tooltipId : undefined,
)

// `attrs` isn't reactive, so this stays a function the render re-evaluates
const attrs = useAttrs()
const wrapperIsTrigger = () => (attrs.tabindex ?? attrs.tabIndex) !== undefined

const visible = computed(
  () => show.value || props.open || (tooltipHovered.value && props.interactive),
)

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
        block: 'text-gray-900 border-transparent',
        background: 'bg-white',
      }
    case 'dark':
      return {
        svg: 'stroke-none fill-gray-900',
        block: 'text-white border-transparent',
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
  },
)

// Bumped on every hide so a placement still computing doesn't reopen a tooltip that was closed meanwhile
let placeRequest = 0

async function placeTooltip() {
  if (props.disabled || !reference.value || !tooltip.value || !arrowRef.value)
    return
  const request = placeRequest

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
      offset(props.offsetOptions),
      arrow({ element: arrowRef.value, padding: props.arrowPadding }),
      shift(props.shiftOptions),
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

  if (request === placeRequest) show.value = true
}

function hide() {
  if (props.open || keyboardOpen.value) return
  placeRequest++
  show.value = false
}

const FOCUSABLE_SELECTOR =
  'a[href], button, input, select, textarea, summary, [tabindex], [contenteditable]:not([contenteditable="false"])'

function getFocusableElements(container: HTMLElement | null) {
  if (!container) return []
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter(
    (el) =>
      el.tabIndex >= 0 &&
      !el.matches(':disabled') &&
      !(el instanceof HTMLInputElement && el.type === 'hidden'),
  )
}

function isInside(node: EventTarget | null) {
  return (
    node instanceof Node &&
    (!!reference.value?.contains(node) || !!tooltip.value?.contains(node))
  )
}

function onReferenceFocusIn(event: FocusEvent) {
  if (props.disabled) return
  const target = event.target as HTMLElement
  // A mouse click also focuses the trigger; only keyboard focus should pin the tooltip open
  if (!target.matches(':focus-visible')) return
  lastTrigger.value = target
  keyboardOpen.value = true
  placeTooltip()
}

// Keeps a hover-opened popper from hiding under keyboard focus once the pointer leaves
function onPopperFocusIn(event: FocusEvent) {
  if ((event.target as HTMLElement).matches(':focus-visible'))
    keyboardOpen.value = true
}

function onFocusOut(event: FocusEvent) {
  if (isInside(event.relatedTarget)) return
  closeFromKeyboard()
}

function closeFromKeyboard() {
  if (!keyboardOpen.value) return
  keyboardOpen.value = false
  if (!reference.value?.matches(':hover')) hide()
}

function dismiss() {
  keyboardOpen.value = false
  tooltipHovered.value = false
  hide()
}

function onReferenceKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    dismiss()
    return
  }
  if (
    event.key !== 'Tab' ||
    event.shiftKey ||
    !props.interactive ||
    !visible.value
  )
    return
  const [first] = getFocusableElements(tooltip.value)
  if (!first) return
  lastTrigger.value = event.target as HTMLElement
  event.preventDefault()
  first.focus()
}

function onPopperKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    lastTrigger.value?.focus()
    dismiss()
    return
  }
  if (event.key !== 'Tab' || !lastTrigger.value) return
  const focusables = getFocusableElements(tooltip.value)
  if (event.shiftKey && event.target === focusables[0]) {
    event.preventDefault()
    lastTrigger.value.focus()
  } else if (
    !event.shiftKey &&
    event.target === focusables[focusables.length - 1] &&
    tooltip.value
  ) {
    // Refocusing the trigger without preventDefault lets the browser's Tab continue from the
    // trigger's place in the page; `inert` stops it landing back in the popper at the end of <body>
    const popper = tooltip.value
    lastTrigger.value.focus()
    popper.inert = true
    setTimeout(() => (popper.inert = false))
  }
}

onMounted(() => {
  mounted.value = true
  watch(
    () => [
      props.open,
      props.disabled,
      props.arrowPadding,
      props.placement,
      props.forcePlacement,
      props.shiftOptions,
      props.offsetOptions,
    ],
    async () => {
      if ((props.open || keyboardOpen.value) && !props.disabled) {
        placeTooltip()
      } else {
        placeRequest++
        show.value = false
        await nextTick()
        if (!tooltip.value?.matches(':hover')) tooltipHovered.value = false
      }
    },
    { immediate: true },
  )
})
</script>

<template>
  <div
    v-bind="$attrs"
    ref="reference"
    :aria-describedby="wrapperIsTrigger() ? describedBy : undefined"
    @mouseover="!disabled && !open && placeTooltip()"
    @mouseout="hide()"
    @focusin="onReferenceFocusIn"
    @focusout="onFocusOut"
    @keydown="onReferenceKeydown"
  >
    <!--
      @slot element to hover on to open the tooltip
      @binding {string | undefined} describedBy id of the tooltip content, for `aria-describedby` on the trigger
    -->
    <slot v-bind="{ describedBy }" />
    <teleport v-if="!disabled" to="#portal-target">
      <div
        ref="tooltip"
        role="tooltip"
        :style="
          positionComputed
            ? `top:${top}px!important;left:${left}px!important;`
            : undefined
        "
        class="absolute"
        :class="[
          {
            invisible: !visible && positionComputed,
            '-top-[10000px] invisible': !positionComputed,
          },
          props.interactive ? 'p-[16px]' : undefined,
        ]"
        @mouseover="tooltipHovered = true"
        @mouseout="tooltipHovered = false"
        @focusin="onPopperFocusIn"
        @focusout="onFocusOut"
        @keydown="onPopperKeydown"
      >
        <div
          class="border rounded shadow-tooltip"
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
            class="rounded text-[16px] leading-[24px] min-w-[160px] text-center p-[8px] relative z-20"
            :class="colors.background"
          >
            <span class="sr-only">Tooltip: </span>
            <div :id="tooltipId">
              <!-- @slot content of the tooltip -->
              <slot name="popper" />
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>
