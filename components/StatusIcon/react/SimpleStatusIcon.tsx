import type { IconSet } from '../constants'

import {
  cyFailedSimpleX16,
  cyFailedSimpleX24,
  cyPassedSimpleX16,
  cyPassedSimpleX24,
  cyCancelledSolidX12,
  cyCancelledSimpleX4,
  cyCancelledSimpleX8,
  cyErroredSimpleX4,
  cyErroredSimpleX8,
  cyErroredSolidX12,
  cyFailedSimpleX4,
  cyFailedSimpleX8,
  cyFailedSimpleX12,
  cyPassedSimpleX4,
  cyPassedSimpleX8,
  cyPassedSimpleX12,
  cyPendingSimpleX4,
  cyPendingSimpleX8,
  cyPendingOutlineX12,
  cyPendingOutlineX16,
  cyPendingOutlineX24,
  cyQueuedOutlineX12,
  cyQueuedOutlineX16,
  cyQueuedOutlineX24,
  cyQueuedSimpleX4,
  cyQueuedSimpleX8,
  cySkippedOutlineX12,
  cySkippedOutlineX16,
  cySkippedOutlineX24,
  cySkippedSimpleX4,
  cySkippedSimpleX8,
  cyRunningOutlineX12,
  cyRunningOutlineX16,
  cyRunningOutlineX24,
  cyRunningSimpleX4,
  cyRunningSimpleX8,
  cyPlaceholderSolidX12,
  cyPlaceholderSolidX16,
  cyPlaceholderSolidX24,
  cyPlaceholderSimpleX4,
  cyPlaceholderSimpleX8,
  cyCancelledSolidX16,
  cyCancelledSolidX24,
  cyErroredSolidX16,
  cyErroredSolidX24,
} from '@cypress-design/icon-registry'

import * as React from 'react'
import { SVGProps } from 'react'
import { compileReactIconProperties } from '@cypress-design/react-icon'

export const statuses: Record<string, IconSet> = {
  running: {
    shouldSpin: true,
    size4Icon: cyRunningSimpleX4,
    size8Icon: cyRunningSimpleX8,
    size12Icon: cyRunningOutlineX12,
    size16Icon: cyRunningOutlineX16,
    size24Icon: cyRunningOutlineX24,
  },
  passed: {
    shouldSpin: false,
    size4Icon: cyPassedSimpleX4,
    size8Icon: cyPassedSimpleX8,
    size12Icon: cyPassedSimpleX12,
    size16Icon: cyPassedSimpleX16,
    size24Icon: cyPassedSimpleX24,
  },
  failed: {
    shouldSpin: false,
    size4Icon: cyFailedSimpleX4,
    size8Icon: cyFailedSimpleX8,
    size12Icon: cyFailedSimpleX12,
    size16Icon: cyFailedSimpleX16,
    size24Icon: cyFailedSimpleX24,
  },
  unclaimed: {
    shouldSpin: false,
    size4Icon: cyQueuedSimpleX4,
    size8Icon: cyQueuedSimpleX8,
    size12Icon: cyQueuedOutlineX12,
    size16Icon: cyQueuedOutlineX16,
    size24Icon: cyQueuedOutlineX24,
  },
  placeholder: {
    shouldSpin: false,
    size4Icon: cyPlaceholderSimpleX4,
    size8Icon: cyPlaceholderSimpleX8,
    size12Icon: cyPlaceholderSolidX12,
    size16Icon: cyPlaceholderSolidX16,
    size24Icon: cyPlaceholderSolidX24,
  },
  cancelled: {
    shouldSpin: false,
    size4Icon: cyCancelledSimpleX4,
    size8Icon: cyCancelledSimpleX8,
    size12Icon: cyCancelledSolidX12,
    size16Icon: cyCancelledSolidX16,
    size24Icon: cyCancelledSolidX24,
  },
  noTests: {
    shouldSpin: false,
    size4Icon: cyCancelledSimpleX4,
    size8Icon: cyCancelledSimpleX8,
    size12Icon: cyCancelledSolidX12,
    size16Icon: cyCancelledSolidX16,
    size24Icon: cyCancelledSolidX24,
  },
  errored: {
    shouldSpin: false,
    size4Icon: cyErroredSimpleX4,
    size8Icon: cyErroredSimpleX8,
    size12Icon: cyErroredSolidX12,
    size16Icon: cyErroredSolidX16,
    size24Icon: cyErroredSolidX24,
  },
  timedOut: {
    shouldSpin: false,
    size4Icon: cyErroredSimpleX4,
    size8Icon: cyErroredSimpleX8,
    size12Icon: cyErroredSolidX12,
    size16Icon: cyErroredSolidX16,
    size24Icon: cyErroredSolidX24,
  },
  overLimit: {
    shouldSpin: false,
    size4Icon: cyErroredSimpleX4,
    size8Icon: cyErroredSimpleX8,
    size12Icon: cyErroredSolidX12,
    size16Icon: cyErroredSolidX16,
    size24Icon: cyErroredSolidX24,
  },
  skipped: {
    shouldSpin: false,
    size4Icon: cySkippedSimpleX4,
    size8Icon: cySkippedSimpleX8,
    size12Icon: cySkippedOutlineX12,
    size16Icon: cySkippedOutlineX16,
    size24Icon: cySkippedOutlineX24,
  },
  pending: {
    shouldSpin: false,
    size4Icon: cyPendingSimpleX4,
    size8Icon: cyPendingSimpleX8,
    size12Icon: cyPendingOutlineX12,
    size16Icon: cyPendingOutlineX16,
    size24Icon: cyPendingOutlineX24,
  },
}

export type SimpleStatusIconProps = {
  size?: '4' | '8' | '12' | '16' | '24'
  /**
    If there is no status provided, a placeholder icon will be shown
  */
  status?: keyof typeof statuses | null | undefined
}

export const SimpleStatusIcon: React.FC<
  SimpleStatusIconProps & SVGProps<SVGSVGElement>
> = ({ size = '24', status = 'placeholder', ...rest }) => {
  const statusInfo = status ? statuses[status] : statuses.placeholder

  const icon = statusInfo[`size${size}Icon`]

  const classes = `inline-block ${rest.className || ''} ${
    statusInfo.shouldSpin && size !== '4' ? 'animate-spin' : ''
  }`

  return React.createElement(
    'svg',
    compileReactIconProperties({
      body: icon.data,
      compiledClasses: [classes],
      size,
    })
  )
}

export default SimpleStatusIcon
