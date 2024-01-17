import * as React from 'react'
import clsx from 'clsx'
import { SharedSettings } from '@cypress-design/constants-example'

export interface ExampleProps {
  id: string
  label?: string
  className?: string
}

export const Example: React.FC<
  ExampleProps & React.HTMLProps<HTMLDivElement>
> = ({ id, label, className, ...rest }) => {
  return (
    <div {...rest} id={id} className={clsx('bg-jade-100', className)}>
      <label>{label}</label>
      Render Function for Example
      <p>{SharedSettings.foo}</p>
    </div>
  )
}

export default Example
