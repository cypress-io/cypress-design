import clsx from 'clsx'
import React, { FunctionComponent } from 'react'

interface IconProps extends React.HTMLProps<HTMLLinkElement> {
  className?: string
  asListItem?: boolean
  spin?: boolean
  name: string
}

const Icon: FunctionComponent<IconProps> = ({
  spin,
  asListItem = false,
  name,
  className,
  ...rest
}) => {
  if (typeof name === 'string') {
    const iconClassName = clsx(
      `fa fa-${name}`,
      {
        'fa-spin': spin,
        'fa-li': asListItem,
      },
      className
    )

    return <i className={iconClassName} aria-hidden {...rest} />
  }

  return name
}

export { Icon }
