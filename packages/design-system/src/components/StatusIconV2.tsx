// docs in Storybook http://localhost:6006

import {
  RunGroupStatusesValue,
  RunInstanceStatusesValue,
  RunStatusesValue,
  TestResultStatesValue,
} from '@packages/common/src/enums'
import {
  getStatusDisplayInfoV2,
  // runStatusEnumToStatus,
  // instanceStatusEnumToStatus,
} from '@frontend/dashboard/src/lib/utils-ts'
import cs from 'clsx'
import React, { FunctionComponent } from 'react'
import SVG, { Props as SVGProps } from 'react-inlinesvg'

type Status =
  | RunGroupStatusesValue
  | RunInstanceStatusesValue
  | RunStatusesValue
  | TestResultStatesValue
  | null

interface StatusIconProps extends Partial<SVGProps> {
  size?: 'x4' | 'x8' | 'x12' | 'x16' | 'x24'
  status?: Status
  variant?: 'outline' | 'solid'
}

const getDisplayVariant = (
  size: 'x4' | 'x8' | 'x12' | 'x16' | 'x24',
  iconName?: string,
  variant?: 'outline' | 'solid'
): string | undefined => {
  // some status icons don't have all variants
  // if they don't have the one requested, override it

  if (size === 'x4' || size === 'x8') {
    // these are all the same for both variants
    return 'solid'
  }

  if (
    iconName === 'pending' ||
    iconName === 'queued' ||
    iconName === 'running' ||
    iconName === 'skipped'
  ) {
    return 'outline'
  }

  if (iconName === 'placeholder') {
    return 'solid'
  }

  return variant
}

export const StatusIconV2: FunctionComponent<StatusIconProps> = ({
  size = 'x16',
  status,
  variant = 'outline',
  ...props
}) => {
  const statusInfo = getStatusDisplayInfoV2(status)
  const iconVariant = getDisplayVariant(size, statusInfo.iconName, variant)

  const iconName = `${statusInfo.iconName}-${iconVariant}_${size}`

  const px: number = Number(size.replace('x', ''))

  return (
    <SVG
      {...props}
      src={require(`@DS/lib/img/icons/statuses/${iconName}.svg`)}
      className={cs('cy-status-icon', props.className, {
        'animate-spin': statusInfo.iconSpin && size !== 'x4',
      })}
      width={px}
      height={px}
      onError={console.log}
    />
  )
}
