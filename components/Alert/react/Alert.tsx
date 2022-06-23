import * as React from 'react'
import clsx from 'clsx'
import {
  IconChevronDownSmall,
  IconActionDeleteLarge,
  IconWarningCircle,
  IconCheckmarkOutline,
} from '@cypress-design/react-icon'
import type { AlertStatus } from '../constants'
import { alertClasses } from '../constants'

const dummyComp: React.FC = () => <div>Dummy</div>

export interface AlertProps {
  type?: AlertStatus
  title: React.ReactNode
  detailsTitle?: string
  details?: React.ReactNode
  onDismiss?: () => void
  noIcon?: boolean
  notRounded?: boolean
  dismissible?: boolean
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
  ...rest
}) => {
  const typeClasses = alertClasses[type]
  const Icon =
    type === 'error'
      ? IconWarningCircle
      : type === 'warning'
      ? IconWarningCircle
      : type === 'success'
      ? IconCheckmarkOutline
      : undefined

  const [detailsExpanded, setDetailsExpanded] = React.useState(false)
  const [dismissed, setDismissed] = React.useState(false)

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
                onClick={() => {
                  setDismissed(true)
                  onDismiss && onDismiss()
                }}
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
