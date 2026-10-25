import type { ComponentProps } from 'react'
import type StatusIcon from './StatusIcon'
export { default } from './StatusIcon'
export { StatusIcon } from './StatusIcon'
export type StatusIconProps = ComponentProps<typeof StatusIcon>
export { OutlineStatusIcon } from './_OutlineStatusIcon'
export { SimpleStatusIcon } from './_SimpleStatusIcon'
export { SolidStatusIcon } from './_SolidStatusIcon'
export type { statusTypes as StatusType } from '@cypress-design/constants-statusicon'
