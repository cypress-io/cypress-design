import * as React from 'react'
import clsx from 'clsx'
import { SharedSettings } from '@cypress-design/constants-speclisttestitem'

export interface SpecListTestItemProps {
  id: string
  label?: string
  className?: string
}

export const SpecListTestItem: React.FC<
  SpecListTestItemProps & React.HTMLProps<HTMLDivElement>
> = ({ id, label, className, ...rest }) => {
  return (
    <div {...rest} id={id} className={clsx('bg-jade-100', className)}>
      <label>{label}</label>
      Render Function for SpecListTestItem
      <p>{SharedSettings.foo}</p>
    </div>
  )
}

export default SpecListTestItem
