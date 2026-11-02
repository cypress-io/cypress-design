import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import {
  buildProgressBarView,
  ensureActiveStyle,
  type ProgressBarProps as SharedProgressBarProps,
} from '@cypress-design/constants-progressbar'

export interface ProgressBarProps
  extends SharedProgressBarProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Merged onto the track, so a `bg-*` class here recolors it. */
  className?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  segments,
  size,
  color,
  theme,
  active,
  fillClassName,
  valueText,
  className,
  ...rest
}) => {
  const view = buildProgressBarView({
    value,
    max,
    segments,
    size,
    color,
    theme,
    active,
    fillClassName,
    valueText,
  })

  if (view.hasActiveFill) ensureActiveStyle()

  return (
    <div
      data-cy="progress-bar"
      {...rest}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={view.max}
      aria-valuenow={view.now}
      aria-valuetext={view.valueText}
      className={twMerge(view.trackClasses, className)}
    >
      {view.fills.map((fill) => (
        <div
          key={fill.key}
          data-cy="progress-bar-fill"
          className={twMerge(...fill.classes)}
          style={{ width: `${fill.width}%` }}
        />
      ))}
    </div>
  )
}

export default ProgressBar
