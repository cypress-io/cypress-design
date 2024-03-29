import {
  ICON_COLOR_PROP_NAMES,
  compileIcon,
} from '@cypress-design/icon-registry'
import type { OpenIconProps, IconProps } from '@cypress-design/icon-registry'
import { h, computed, defineComponent } from 'vue'
import type { SVGAttributes } from 'vue'
import {
  compileVueIconProperties,
  useShouldRenderDefs,
} from './compileProperties'

interface Props extends Pick<IconProps, 'name'>, Omit<OpenIconProps, 'name'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  class?: any
}

export default defineComponent<Props>({
  // the props here need to exist because of runtime treatment
  // if we don't have them explicit, vuejs will think it's attributes
  // and not pass it down as props to the components
  // but for typescript to pick up the correct prop types, we need to cast it to unknown
  props: [
    ...ICON_COLOR_PROP_NAMES,
    'interactiveColorsOnGroup',
    'size',
    'name',
    'alt',
    'class',
  ] as unknown as undefined,
  setup(
    // the OpenIconProps helps volar extract the documentation from the props
    // since the IconProps are more restrictive, it will not change the use behavior
    props: Props,
    { attrs }: { attrs: Omit<SVGAttributes, 'name' | 'class'> },
  ) {
    const ret = computed(() => {
      const { class: className, ...otherProps } = props
      const iconProps = compileIcon(otherProps)
      return { className, iconProps }
    })

    const { componentProps, defs } = compileVueIconProperties(
      computed(() => ret.value.iconProps),
    )

    const { shouldRenderDefs } = useShouldRenderDefs(props.name, defs)

    return () => {
      return shouldRenderDefs.value
        ? [
            h('svg', {
              innerHTML: defs.value,
              'data-cy-icon-unified-defs': props.name,
              class: [
                'w-0',
                'h-0',
                'absolute',
                'pointer-events-none',
                'opacity-0',
              ],
            }),
            h('svg', {
              ...attrs,
              ...componentProps.value,
              class: [ret.value.className, componentProps.value.class],
            }),
          ]
        : h('svg', {
            ...attrs,
            ...componentProps.value,
            class: [ret.value.className, componentProps.value.class],
          })
    }
  },
})
