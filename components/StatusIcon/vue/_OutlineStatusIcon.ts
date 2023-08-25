import { defineComponent, h } from 'vue'
import type { SVGAttributes } from 'vue'
import type { VariantStatusIconProps } from '@cypress-design/constants-statusicon'
import { outline } from '@cypress-design/constants-statusicon'

import { compileProps } from './compileProps'

export default defineComponent({
  props: ['size', 'status'],
  setup(props: SVGAttributes & VariantStatusIconProps) {
    const { componentProps } = compileProps(props, {
      variantName: 'outline',
      statuses: outline.statuses,
    })

    return () => h('svg', componentProps.value)
  },
})
