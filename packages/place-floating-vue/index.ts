import { Ref, computed, ref } from 'vue'
import type { Placement, Side } from '@floating-ui/dom'
import { computePosition, flip, offset, arrow } from '@floating-ui/dom'

const ROTATE_MAP = {
  bottom: 180,
  left: 270,
  top: 0,
  right: 90,
} as const

export default function useTooltips({
  reference,
  tooltip,
  arrowRef,
  props,
}: {
  reference: Ref<HTMLElement | null>
  tooltip: Ref<HTMLElement | null>
  arrowRef: Ref<HTMLElement | null>
  props: {
    placement?: Placement
    forcePlacement?: boolean
    interactive?: boolean
    color?: string
  }
}) {
  const left = ref(0)
  const top = ref(0)
  const arrowLeft = ref(0)
  const arrowTop = ref(0)
  const arrowRotate = ref(0)
  const arrowXRule: Ref<'left' | 'right'> = ref('left')
  const arrowYRule: Ref<'top' | 'bottom'> = ref('top')
  const dropShadowFilter: Ref<string | undefined> = ref(undefined)
  const placementSideFinal = ref(props.placement)
  const positionComputed = ref(false)
  const show = ref(false)

  async function placeTooltip() {
    if (!reference.value || !tooltip.value || !arrowRef.value) return
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

  const arrowStyle = computed(
    () =>
      `transform: rotate(${arrowRotate.value}deg); 
       filter: ${dropShadowFilter.value};
       ${arrowYRule.value}:${arrowTop.value}px!important;
       ${arrowXRule.value}:${arrowLeft.value}px!important;`
  )

  const tooltipStyle = computed(() =>
    positionComputed.value
      ? { top: `${top.value}px!important`, left: `${left.value}px!important;` }
      : undefined
  )

  return { placeTooltip, arrowStyle, tooltipStyle, positionComputed, show }
}
