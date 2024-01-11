import * as React from 'react'
import clsx from 'clsx'

export interface TestItemProps {
  id: string
  label?: string
  className?: string
}

export const TestItem: React.FC<
  TestItemProps & React.HTMLProps<HTMLDivElement>
> = ({ id, label, className, ...rest }) => {
  return (
    <div {...rest} id={id} className={clsx('bg-jade-100', className)}>
      <label>{label}</label>
      Render Function for TestItem
      <p>{label}</p>
    </div>
  )
}

export default TestItem
