import cs from 'clsx'
import * as React from 'react'
import type { FunctionComponent } from 'react'
import clsx from 'clsx'

const styles: Record<string, string> = {}

export interface TooltipProps {
  id: string
  label?: string
  className?: string
}

export const Tooltip: FunctionComponent<TooltipProps> = ({
  id,
  label,
  className,
}) => {
  return (
    <div id={id} className={clsx('bg-jade-100', className)}>
      <label>{label}</label>
      Render Function for Tooltip
    </div>
  )
}

export default Tooltip
