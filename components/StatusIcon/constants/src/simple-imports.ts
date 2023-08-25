import type { IconSet } from './constants'
import {
  cyStatusFailedSimpleX16,
  cyStatusFailedSimpleX24,
  cyStatusPassedSimpleX16,
  cyStatusPassedSimpleX24,
  cyStatusCancelledSolidX12,
  cyStatusCancelledSimpleX4,
  cyStatusCancelledSimpleX8,
  cyStatusErroredSimpleX4,
  cyStatusErroredSimpleX8,
  cyStatusErroredSolidX12,
  cyStatusFailedSimpleX4,
  cyStatusFailedSimpleX8,
  cyStatusFailedSimpleX12,
  cyStatusPassedSimpleX4,
  cyStatusPassedSimpleX8,
  cyStatusPassedSimpleX12,
  cyStatusPendingSimpleX4,
  cyStatusPendingSimpleX8,
  cyStatusPendingOutlineX12,
  cyStatusPendingOutlineX16,
  cyStatusPendingOutlineX24,
  cyStatusQueuedOutlineX12,
  cyStatusQueuedOutlineX16,
  cyStatusQueuedOutlineX24,
  cyStatusQueuedSimpleX4,
  cyStatusQueuedSimpleX8,
  cyStatusSkippedOutlineX12,
  cyStatusSkippedOutlineX16,
  cyStatusSkippedOutlineX24,
  cyStatusSkippedSimpleX4,
  cyStatusSkippedSimpleX8,
  cyStatusRunningOutlineX12,
  cyStatusRunningOutlineX16,
  cyStatusRunningOutlineX24,
  cyStatusRunningSimpleX4,
  cyStatusRunningSimpleX8,
  cyStatusPlaceholderSolidX12,
  cyStatusPlaceholderSolidX16,
  cyStatusPlaceholderSolidX24,
  cyStatusPlaceholderSimpleX4,
  cyStatusPlaceholderSimpleX8,
  cyStatusCancelledSolidX16,
  cyStatusCancelledSolidX24,
  cyStatusErroredSolidX16,
  cyStatusErroredSolidX24,
  cyStatusFailingOutlineX4,
  cyStatusFailingOutlineX8,
  cyStatusFailingOutlineX12,
  cyStatusFailingOutlineX16,
  cyStatusFailingOutlineX24,
} from '@cypress-design/icon-registry'

export const statuses: Record<string, IconSet> = {
  running: {
    size4Icon: cyStatusRunningSimpleX4,
    size8Icon: cyStatusRunningSimpleX8,
    size12Icon: cyStatusRunningOutlineX12,
    size16Icon: cyStatusRunningOutlineX16,
    size24Icon: cyStatusRunningOutlineX24,
  },
  failing: {
    size4Icon: cyStatusFailingOutlineX4,
    size8Icon: cyStatusFailingOutlineX8,
    size12Icon: cyStatusFailingOutlineX12,
    size16Icon: cyStatusFailingOutlineX16,
    size24Icon: cyStatusFailingOutlineX24,
  },
  passed: {
    size4Icon: cyStatusPassedSimpleX4,
    size8Icon: cyStatusPassedSimpleX8,
    size12Icon: cyStatusPassedSimpleX12,
    size16Icon: cyStatusPassedSimpleX16,
    size24Icon: cyStatusPassedSimpleX24,
  },
  failed: {
    size4Icon: cyStatusFailedSimpleX4,
    size8Icon: cyStatusFailedSimpleX8,
    size12Icon: cyStatusFailedSimpleX12,
    size16Icon: cyStatusFailedSimpleX16,
    size24Icon: cyStatusFailedSimpleX24,
  },
  unclaimed: {
    size4Icon: cyStatusQueuedSimpleX4,
    size8Icon: cyStatusQueuedSimpleX8,
    size12Icon: cyStatusQueuedOutlineX12,
    size16Icon: cyStatusQueuedOutlineX16,
    size24Icon: cyStatusQueuedOutlineX24,
  },
  placeholder: {
    size4Icon: cyStatusPlaceholderSimpleX4,
    size8Icon: cyStatusPlaceholderSimpleX8,
    size12Icon: cyStatusPlaceholderSolidX12,
    size16Icon: cyStatusPlaceholderSolidX16,
    size24Icon: cyStatusPlaceholderSolidX24,
  },
  cancelled: {
    size4Icon: cyStatusCancelledSimpleX4,
    size8Icon: cyStatusCancelledSimpleX8,
    size12Icon: cyStatusCancelledSolidX12,
    size16Icon: cyStatusCancelledSolidX16,
    size24Icon: cyStatusCancelledSolidX24,
  },
  noTests: {
    size4Icon: cyStatusErroredSimpleX4,
    size8Icon: cyStatusErroredSimpleX8,
    size12Icon: cyStatusErroredSolidX12,
    size16Icon: cyStatusErroredSolidX16,
    size24Icon: cyStatusErroredSolidX24,
  },
  errored: {
    size4Icon: cyStatusErroredSimpleX4,
    size8Icon: cyStatusErroredSimpleX8,
    size12Icon: cyStatusErroredSolidX12,
    size16Icon: cyStatusErroredSolidX16,
    size24Icon: cyStatusErroredSolidX24,
  },
  timedOut: {
    size4Icon: cyStatusErroredSimpleX4,
    size8Icon: cyStatusErroredSimpleX8,
    size12Icon: cyStatusErroredSolidX12,
    size16Icon: cyStatusErroredSolidX16,
    size24Icon: cyStatusErroredSolidX24,
  },
  overLimit: {
    size4Icon: cyStatusErroredSimpleX4,
    size8Icon: cyStatusErroredSimpleX8,
    size12Icon: cyStatusErroredSolidX12,
    size16Icon: cyStatusErroredSolidX16,
    size24Icon: cyStatusErroredSolidX24,
  },
  skipped: {
    size4Icon: cyStatusSkippedSimpleX4,
    size8Icon: cyStatusSkippedSimpleX8,
    size12Icon: cyStatusSkippedOutlineX12,
    size16Icon: cyStatusSkippedOutlineX16,
    size24Icon: cyStatusSkippedOutlineX24,
  },
  pending: {
    size4Icon: cyStatusPendingSimpleX4,
    size8Icon: cyStatusPendingSimpleX8,
    size12Icon: cyStatusPendingOutlineX12,
    size16Icon: cyStatusPendingOutlineX16,
    size24Icon: cyStatusPendingOutlineX24,
  },
}
