import cs from 'clsx'
import React, { FunctionComponent, ReactNode } from 'react'

type PropertyProps = {
  name?: ReactNode
  value?: ReactNode
  className?: string
  children: ReactNode
}

const Property: FunctionComponent<PropertyProps> = ({
  name,
  value,
  children,
  className,
}) => (
  <div className={cs('property-list__property', className)}>
    {Boolean(name) && <dt>{name}</dt>}

    {Boolean(value) && <dd>{value}</dd>}

    {Boolean(children) && <dd>{children}</dd>}
  </div>
)

interface PropertyListProps {
  children: ReactNode
  className?: string
}

export const PropertyList: FunctionComponent<PropertyListProps> & {
  Property: typeof Property
} = ({ children, className }) => (
  <dl className={cs('property-list', className)}>{children}</dl>
)

PropertyList.Property = Property
