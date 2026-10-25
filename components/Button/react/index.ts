import type { ComponentProps } from 'react'
import type Button from './Button'
export { default } from './Button'
export { Button } from './Button'
export type ButtonProps = ComponentProps<typeof Button>
export {
  CssVariantClassesTable as VariantClassesTable,
  CssStaticClasses as StaticClasses,
  CssSizeClassesTable as SizeClassesTable,
  type ButtonVariants,
} from '@cypress-design/constants-button'
