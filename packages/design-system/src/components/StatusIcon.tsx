import {
  RunGroupStatusesValue,
  RunInstanceStatusesValue,
  RunStatusesValue,
  TestResultStatesValue,
} from '@packages/common/src/enums'
import { Tooltip, palette } from '@frontend/design-system'
import cs from 'clsx'
import React, { FunctionComponent } from 'react'

import {
  RunStatusEnum,
  RunInstanceStatusEnum,
} from '@frontend/dashboard/src/graphql-codegen-operations.gen'
import {
  getStatusDisplayInfo,
  runStatusEnumToStatus,
  instanceStatusEnumToStatus,
} from '@frontend/dashboard/src/lib/utils-ts'

import { Icon } from './Icon'

interface StatusIconProps extends React.HTMLProps<HTMLLinkElement> {
  className?: string
  runStatusEnum?: RunStatusEnum | null
  instanceStatusEnum?: RunInstanceStatusEnum | null
  color?: string
  isCircle?: boolean
  status?:
    | RunGroupStatusesValue
    | RunInstanceStatusesValue
    | RunStatusesValue
    | TestResultStatesValue
    | string
    | null
}

interface TestResultStatusIconProps extends React.HTMLProps<HTMLLinkElement> {
  buildNumber?: string | number
  className?: string
  hasTooltip?: boolean
  color?: string
  isCircle?: boolean
  status?:
    | RunGroupStatusesValue
    | RunInstanceStatusesValue
    | RunStatusesValue
    | TestResultStatesValue
    | string
    | null
}

export const StatusIcon: FunctionComponent<StatusIconProps> = ({
  className,
  status,
  runStatusEnum,
  instanceStatusEnum,
  color,
  isCircle = false,
  ...rest
}) => {
  const statusInfo = (() => {
    if (runStatusEnum) {
      return getStatusDisplayInfo(runStatusEnumToStatus(runStatusEnum))
    }

    if (instanceStatusEnum) {
      return getStatusDisplayInfo(
        instanceStatusEnumToStatus(instanceStatusEnum)
      )
    }

    return getStatusDisplayInfo(status)
  })()

  if (isCircle) {
    return (
      <span className="fa-stack fa-fw">
        <i
          className="fa fa-circle fa-stack-2x"
          style={{ color: statusInfo.color }}
        />
        <Icon
          name={statusInfo.iconName}
          spin={statusInfo.iconSpin}
          style={{ color: palette.grayA1 }}
          className={cs('status-icon', 'fa-stack-1x', className)}
          {...rest}
        />
      </span>
    )
  }

  return (
    <Icon
      name={statusInfo.iconName}
      spin={statusInfo.iconSpin}
      style={{ color: color || statusInfo.color }}
      className={cs('status-icon', 'fa-fw', className)}
      {...rest}
    />
  )
}

export const getStatusCopy = (status: string | null | undefined) => {
  switch (status) {
    case 'cancelled':
      return 'was canceled'
    case 'noTests':
      return 'had no tests'
    case 'overLimit':
      return 'was over the plan limit'
    case 'pending':
      return 'was pending'
    case 'running':
      return 'is running'
    case 'skipped':
      return 'was skipped'
    case 'timedOut':
      return 'timed out'
    default:
      return status
  }
}

export const TestResultStatusIcon: FunctionComponent<TestResultStatusIconProps> =
  ({
    buildNumber,
    className,
    hasTooltip = false,
    status,
    color,
    isCircle = false,
    ...rest
  }) => {
    if (!hasTooltip) {
      return (
        <StatusIcon
          isCircle={isCircle}
          className={className}
          color={color}
          status={status}
          {...rest}
        />
      )
    }

    let tooltipText = `This test case ${getStatusCopy(status)}`
    if (buildNumber) {
      tooltipText += ` in run #${buildNumber}`
    }

    return (
      <Tooltip
        placement="top"
        overlay={tooltipText}
        trigger={['click', 'hover']}
      >
        <StatusIcon
          isCircle={isCircle}
          className={className}
          color={color}
          status={status}
          {...rest}
        />
      </Tooltip>
    )
  }
