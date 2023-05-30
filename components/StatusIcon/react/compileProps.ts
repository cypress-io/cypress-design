import type {
  IconSet,
  VariantStatusIconProps,
} from '@cypress-design/constants-statusicon'
import { statuses as StatusForColor } from '@cypress-design/constants-statusicon'
import { compileReactIconProperties } from '@cypress-design/react-icon'
import { getComponentAttributes } from '@cypress-design/icon-registry'

export const compileProps = ({
  status,
  statuses,
  className,
  size,
  variantName,
}: VariantStatusIconProps & {
  statuses: Record<string, IconSet>
  className: string | undefined
  variantName: string
}) => {
  const statusInfo = status ? statuses[status] : statuses.placeholder

  const iconInfo = status ? StatusForColor[status] : StatusForColor.placeholder

  const { data: iconData } = statusInfo[`size${size}Icon`]

  const classes = `inline-block ${className || ''}`

  const { compiledClasses } = getComponentAttributes({
    strokeColor: iconInfo.color,
    size,
    availableSizes: [size],
    fillColor: iconInfo.secondaryColor,
  })

  return compileReactIconProperties({
    body: iconData,
    compiledClasses: [...compiledClasses, classes],
    size,
    name: `status_${status}_${size}_${variantName}`,
  })
}
