import { computed, defineComponent, h } from 'vue'
import { logoLockUp, logoMark } from '@cypress-design/icon-registry'

const renderSvg = (variant: {
  viewBox: string
  data: string
  width: number
  height: number
}) =>
  h('svg', {
    width: variant.width,
    height: variant.height,
    viewBox: variant.viewBox,
    innerHTML: variant.data,
  })

export const CypressLockUp = defineComponent({
  props: {
    variant: {
      type: String as () => keyof typeof logoLockUp,
      default: 'default',
    },
  },
  setup(props) {
    const resolvedVariant = computed(() => logoLockUp[props.variant])
    return () => renderSvg(resolvedVariant.value)
  },
})

export const CypressMark = defineComponent({
  props: {
    variant: {
      type: String as () => keyof typeof logoMark,
      default: 'default',
    },
  },
  setup(props) {
    const resolvedVariant = computed(() => logoMark[props.variant])
    return () => () => renderSvg(resolvedVariant.value)
  },
})
