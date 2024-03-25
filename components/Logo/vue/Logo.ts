import { computed, defineComponent, h } from 'vue'
import { logoLockUp, logoMark } from '@cypress-design/icon-registry'

export const CypressLockUp = defineComponent({
  props: {
    variant: {
      type: String as () => keyof typeof logoLockUp,
      default: 'default',
    },
  },
  setup(props) {
    const resolvedVariant = computed(() => logoLockUp[props.variant])
    return () =>
      h('svg', {
        viewBox: resolvedVariant.value?.viewBox,
        innerHTML: resolvedVariant.value?.data,
      })
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
    return () =>
      h('svg', {
        viewBox: resolvedVariant.value?.viewBox,
        innerHTML: resolvedVariant.value?.data,
      })
  },
})
