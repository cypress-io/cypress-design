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

// `forwardRef` so a parent can attach a `ref` to the track `<div>`.
export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  function ProgressBar(
    {
      value,
      max,
      segments,
      size,
      color,
      theme,
      active,
      fillClassName,
      valueText,
      'aria-valuetext': ariaValueText,
      className,
      ...rest
    },
    ref,
  ) {
    const view = buildProgressBarView({
      value,
      max,
      segments,
      size,
      color,
      theme,
      active,
      fillClassName,
      valueText: valueText ?? ariaValueText,
    })

    // React's hook for injecting styles: it runs before layout effects, so
    // the shimmer rule exists before the active fill first paints.
    React.useInsertionEffect(() => {
      if (view.hasActiveFill) ensureActiveStyle()
    }, [view.hasActiveFill])

    return (
      <div
        data-cy="progress-bar"
        {...rest}
        ref={ref}
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
  },
)

export default ProgressBar
