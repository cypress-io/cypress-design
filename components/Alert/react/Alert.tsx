import * as React from 'react'
import clsx from 'clsx'
import {
  IconChevronDownSmall,
  IconActionDeleteLarge,
  IconWarningCircle,
  IconCheckmarkOutline,
} from '@cypress-design/react-icon'
import { DetailsAnimation } from '@cypress-design/details-animation'
import {
  AlertSize,
  alertSizesClasses,
  AlertVariant,
  defaultAlertSize,
  defaultAlertTitle,
  defaultAlertVariant,
  alertClasses,
} from '@cypress-design/constants-alert'

export interface AlertProps {
  /**
   * Title of the alert
   */
  title: React.ReactNode
  /**
   * Box at the bottom of the alert for buttons or links
   */
  footer: React.ReactNode
  /**
   * Color scheme
   */
  variant?: AlertVariant
  /**
   * Color scheme
   * @deprecated Use `variant` instead
   */
  type?: AlertVariant
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
  /**
   * Size of the alert
   */
  size?: AlertSize
}

export const Alert: React.FC<
  AlertProps & Omit<React.HTMLProps<HTMLDivElement>, 'size'>
> = ({
  variant,
  type = defaultAlertVariant,
  detailsTitle = defaultAlertTitle,
  onDismiss,
  noIcon,
  notRounded,
  dismissible,
  title,
  footer,
  details,
  children,
  className,
  duration,
  customIcon,
  size = defaultAlertSize,
  ...rest
}) => {
  variant = variant ?? type
  const variantClasses = alertClasses[variant] ?? {}
  const sizeClasses = alertSizesClasses[size] ?? {}
  const Icon =
    customIcon ??
    (variant === 'error'
      ? IconWarningCircle
      : variant === 'warning'
      ? IconWarningCircle
      : variant === 'success'
      ? IconCheckmarkOutline
      : undefined)

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
  }, [])

  React.useEffect(() => {
    if (detailsRef.current && contentRef.current) {
      new DetailsAnimation(detailsRef.current, contentRef.current)
    }
  }, [])

  const detailsRef = React.useRef(null)
  const contentRef = React.useRef(null)

  return (
    <>
      {dismissed ? null : (
        <div
          className={clsx(
            !notRounded && 'rounded',
            'overflow-hidden text-left',
            className,
            variantClasses.wrapperClass
          )}
          {...rest}
        >
          <div
            className={clsx(
              variantClasses.headerClass,
              'flex p-[16px]',
              sizeClasses
            )}
          >
            {!noIcon && Icon && (
              <Icon
                className="my-[4px] mr-[8px]"
                strokeColor={variantClasses.iconColor}
              />
            )}
            <div className="flex-1 font-medium">{title}</div>
            {dismissible && (
              <button
                className="m-[4px] ml-[8px] h-[16px]"
                onClick={dismiss}
                aria-label="Dismiss"
              >
                <IconActionDeleteLarge
                  strokeColor={variantClasses.iconCloseColor}
                />
              </button>
            )}
          </div>
          {children && (
            <div className={clsx('p-[16px]', variantClasses.bodyClass)}>
              {children}
            </div>
          )}
          {details && (
            <details
              className={clsx(
                'p-[16px] border-t border-t-1 cursor-pointer',
                variantClasses.bodyClass,
                variantClasses.borderClass
              )}
              ref={detailsRef}
            >
              <summary
                className={clsx(
                  'flex font-medium details-none',
                  variantClasses.detailsHeaderClass
                )}
              >
                <IconChevronDownSmall
                  className="my-[4px] mr-[8px] transition transform -rotate-90 open:rotate-0"
                  strokeColor={variantClasses.iconChevronColor}
                />
                {detailsTitle}
              </summary>
              <div ref={contentRef}>
                <div className="mt-[16px]">{details}</div>{' '}
              </div>
            </details>
          )}
          {footer ? <div className={variantClasses.bodyClass} /> : undefined}
          {footer}
        </div>
      )}
    </>
  )
}

export default Alert
