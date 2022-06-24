import * as React from 'react'
import clsx from 'clsx'
import {
  IconChevronDownSmall,
  IconActionDeleteLarge,
  IconWarningCircle,
  IconCheckmarkOutline,
  WindiColor,
} from '@cypress-design/react-icon'
import type { AlertType, AlertClasses } from '../constants'
import { alertClasses } from '../constants'

export interface AlertProps {
  /**
   * Title of the alert
   */
  title: React.ReactNode
  /**
   * Color scheme
   */
  type?: AlertType
  /**
   * Togglable additional details
   */
  details?: React.ReactNode
  /**
   * If details are provided,text used in the toggle button
   */
  detailsTitle?: string
  /**
   * Show the dismiss button
   */
  dismissible?: boolean
  /**
   * When clicking on the dismiss button, this function will be called
   */
  onDismiss?: () => void
  /**
   * When an icon is displayed by default, use this to remove it
   */
  noIcon?: boolean
  /**
   * If you need square corners
   */
  notRounded?: boolean
  /**
   * Dismiss the alert after a delay (in ms)
   */
  duration?: number
  /**
   * Replace the default left icon
   */
  customIcon?: React.FC<React.SVGProps<SVGSVGElement>>
}

export const Alert: React.FC<AlertProps & React.HTMLProps<HTMLDivElement>> = ({
  type = 'info',
  detailsTitle = 'Additional details',
  onDismiss,
  noIcon,
  notRounded,
  dismissible,
  title,
  details,
  children,
  className,
  duration,
  customIcon,
  ...rest
}) => {
  const typeClasses = alertClasses[type]
  const Icon =
    customIcon ??
    (type === 'error'
      ? IconWarningCircle
      : type === 'warning'
      ? IconWarningCircle
      : type === 'success'
      ? IconCheckmarkOutline
      : undefined)

  const [detailsExpanded, setDetailsExpanded] = React.useState(false)
  const [dismissed, setDismissed] = React.useState(false)
  const [durationTimeout, setDurationTimeout] = React.useState<
    number | undefined
  >(undefined)

  function clearDurationTimeout() {
    if (durationTimeout) {
      clearTimeout(durationTimeout)
      setDurationTimeout(undefined)
    }
  }

  function dismiss() {
    setDismissed(true)
    onDismiss && onDismiss()
    clearDurationTimeout()
  }

  React.useEffect(() => {
    if (onDismiss && duration && !durationTimeout) {
      setDismissed(false)
      const timeout = setTimeout(dismiss, duration) as any
      setDurationTimeout(timeout)
    }
    return clearDurationTimeout
  })

  return (
    <>
      {dismissed ? null : (
        <div
          className={clsx(
            !notRounded && 'rounded',
            'overflow-hidden',
            className
          )}
          {...rest}
        >
          <div className={clsx(typeClasses.headerClass, 'flex p-16px')}>
            {!noIcon && Icon && (
              <Icon className="my-4px mr-8px" {...typeClasses.iconProps} />
            )}
            <div className="flex-1 font-medium">{title}</div>
            {dismissible && (
              <button
                className="m-4px ml-8px h-16px"
                onClick={dismiss}
                aria-label="Dismiss"
              >
                <IconActionDeleteLarge />
              </button>
            )}
          </div>
          {children && (
            <div className={clsx('p-16px', typeClasses.bodyClass)}>
              {children}
            </div>
          )}
          {details && (
            <div
              className={clsx(
                'p-16px border-t-1',
                typeClasses.bodyClass,
                typeClasses.borderClass
              )}
            >
              <button
                className={clsx(
                  'flex font-medium',
                  typeClasses.detailsHeaderClass
                )}
                onClick={() => setDetailsExpanded(!detailsExpanded)}
              >
                <IconChevronDownSmall
                  className={clsx(
                    'my-4px mr-8px',
                    !detailsExpanded && 'transform -rotate-90'
                  )}
                  {...typeClasses.iconChevronProps}
                />
                {detailsTitle}
              </button>
              {detailsExpanded && <div className="mt-8px">{details}</div>}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Alert
