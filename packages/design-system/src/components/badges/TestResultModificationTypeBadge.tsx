import {
  Badge,
  getModificationTypeDisplayInfo,
  palette,
} from '@frontend/design-system'
import cs from 'clsx'
import React, { FunctionComponent } from 'react'

import { TestModificationTypeEnum } from '@frontend/dashboard/src/graphql-codegen-operations.gen'

interface TestResultModificationTypeBadgeProps {
  modificationType: TestModificationTypeEnum
  className?: string
  isCompact?: boolean
  isInactive?: boolean
}

export const TestResultModificationTypeBadge: FunctionComponent<TestResultModificationTypeBadgeProps> =
  ({ modificationType, className, isCompact = false, isInactive = false }) => {
    const displayInfo = getModificationTypeDisplayInfo(modificationType)

    return (
      <div className={cs('test-result-modification-type-badge', className)}>
        <Badge
          style={{
            borderColor: isInactive ? palette.gray300 : displayInfo.borderColor,
            color: isInactive ? palette.gray300 : displayInfo.color,
          }}
        >
          {isCompact ? displayInfo.compactLabel : displayInfo.label}
        </Badge>
      </div>
    )
  }
