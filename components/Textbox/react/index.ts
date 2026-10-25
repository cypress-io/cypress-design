import type { ComponentProps } from 'react'
import type Textbox from './Textbox'
export { default } from './Textbox'
export { Textbox } from './Textbox'
export type TextboxProps = ComponentProps<typeof Textbox>
export {
  CssVariantClasses as VariantClasses,
  CssStaticClasses as StaticClasses,
  CssInputSizeClasses as InputSizeClasses,
  CssRoundedClasses as RoundedClasses,
  CssIconColorClasses as IconColorClasses,
  DividerClasses,
  type TextboxTheme,
  type TextboxVariant,
  type TextboxSize,
} from '@cypress-design/constants-textbox'
