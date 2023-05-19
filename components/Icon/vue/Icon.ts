import {
  ICON_COLOR_PROP_NAMES,
  compileIcon,
} from '@cypress-design/icon-registry'
import type { OpenIconProps, IconProps } from '@cypress-design/icon-registry'
import { h, computed, defineComponent } from 'vue'
import type { SVGAttributes } from 'vue'
import { compileVueIconProperties } from './compileProperties'

export default defineComponent(
  (
    // the OpenIconProps helps volar extract the documentation from the props
    // since the IconProps are more restrictive, it will not change the use behavior
    props: OpenIconProps & Pick<IconProps, 'name'> & Omit<SVGAttributes, 'name'>
  ) => {
    const ret = computed(() => {
      const { class: className, ...otherProps } = props
      const iconProps = compileIcon(otherProps)
      return { className, iconProps }
    })

    const properties = compileVueIconProperties(
      computed(() => ret.value.iconProps)
    )

    return () =>
      h('svg', {
        ...properties.value,
        class: [ret.value.className, properties.value.class],
      })
  },
  {
    // @ts-expect-error - vue types need an update
    props: [
      ...ICON_COLOR_PROP_NAMES,
      'interactiveColorsOnGroup',
      'size',
      'name',
    ],
  }
)
