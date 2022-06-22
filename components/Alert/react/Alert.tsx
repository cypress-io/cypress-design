import * as React from 'react'
import clsx from 'clsx'

const styles: Record<string, string> = {}

export interface AlertProps {
  id: string
  label?: string
  className?: string
}

export const Alert: React.FC<
  AlertProps & React.HTMLProps<HTMLDivElement>
> = ({ id, label, className, ...rest }) => {
  return (
    <div {...rest} id={id} className={clsx('bg-jade-100', className)}>
      <label>{label}</label>
      Render Function for Alert
    </div>
  )
}

export default Alert
