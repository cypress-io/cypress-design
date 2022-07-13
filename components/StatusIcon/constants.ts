import {
  // TODO: break this out by size and/or variant
  cyCancelledOutlineX16,
  cyCancelledOutlineX24,
  cyCancelledSolidX12,
  cyCancelledSolidX16,
  cyCancelledSolidX24,
  cyCancelledSimpleX4,
  cyCancelledSimpleX8,
  cyErroredOutlineX16,
  cyErroredOutlineX24,
  cyErroredSimpleX4,
  cyErroredSimpleX8,
  cyErroredSolidX12,
  cyErroredSolidX16,
  cyErroredSolidX24,
  cyFailedOutlineX16,
  cyFailedOutlineX24,
  cyFailedSimpleX4,
  cyFailedSimpleX8,
  cyFailedSimpleX12,
  cyFailedSimpleX16,
  cyFailedSimpleX24,
  cyFailedSolidX16,
  cyFailedSolidX24,
  cyPassedOutlineX16,
  cyPassedOutlineX24,
  cyPassedSimpleX4,
  cyPassedSimpleX8,
  cyPassedSimpleX12,
  cyPassedSimpleX16,
  cyPassedSimpleX24,
  cyPassedSolidX16,
  cyPassedSolidX24,
  cyPendingSimpleX4,
  cyPendingSimpleX8,
  cyPendingOutlineX12,
  cyPendingOutlineX16,
  cyPendingOutlineX24,
  cyPlaceholderSolidX12,
  cyPlaceholderSolidX16,
  cyPlaceholderSolidX24,
  cyPlaceholderSimpleX4,
  cyPlaceholderSimpleX8,
  cyQueuedOutlineX12,
  cyQueuedOutlineX16,
  cyQueuedOutlineX24,
  cyQueuedSimpleX4,
  cyQueuedSimpleX8,
  cyRunningOutlineX12,
  cyRunningOutlineX16,
  cyRunningOutlineX24,
  cyRunningSimpleX4,
  cyRunningSimpleX8,
  cySkippedOutlineX12,
  cySkippedOutlineX16,
  cySkippedOutlineX24,
  cySkippedSimpleX4,
  cySkippedSimpleX8,
} from '@cypress-design/icon-registry'

type IconContents = {
  name: string
  data: string
}

type VariantIcons = {
  '4': IconContents
  '8': IconContents
  '12': IconContents
  '16': IconContents
  '24': IconContents
}

export type StatusInfo = {
  iconName: string
  color: string
  iconSpin: boolean
  defaultVariant: string
  variants: {
    outline?: VariantIcons
    simple?: VariantIcons
    solid?: VariantIcons
  }
  use: string
}

export const statuses = {
  running: {
    iconName: 'running',
    color: 'indigo-400',
    iconSpin: true,
    use: 'Runs, specs, groups, test results',
    defaultVariant: 'outline',
    variants: {
      outline: {
        '4': cyRunningSimpleX4,
        '8': cyRunningSimpleX8,
        '12': cyRunningOutlineX12,
        '16': cyRunningOutlineX16,
        '24': cyRunningOutlineX24,
      },
    },
  },
  passed: {
    iconName: 'passed',
    color: 'jade-400',
    iconSpin: false,
    defaultVariant: 'outline',
    variants: {
      simple: {
        '4': cyPassedSimpleX4,
        '8': cyPassedSimpleX8,
        '12': cyPassedSimpleX12,
        '16': cyPassedSimpleX16,
        '24': cyPassedSimpleX24,
      },
      solid: {
        '4': cyPassedSimpleX4,
        '8': cyPassedSimpleX8,
        '12': cyPassedSimpleX12,
        '16': cyPassedSolidX16,
        '24': cyPassedSolidX24,
      },
      outline: {
        '4': cyPassedSimpleX4,
        '8': cyPassedSimpleX8,
        '12': cyPassedSimpleX12,
        '16': cyPassedOutlineX16,
        '24': cyPassedOutlineX24,
      },
    },
    use: 'Runs, specs, groups, test results',
    link: 'https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Passed',
  },
  failed: {
    iconName: 'failed',
    color: 'red-400',
    iconSpin: false,
    defaultVariant: 'simple',
    variants: {
      simple: {
        '4': cyFailedSimpleX4,
        '8': cyFailedSimpleX8,
        '12': cyFailedSimpleX12,
        '16': cyFailedSimpleX16,
        '24': cyFailedSimpleX24,
      },
      solid: {
        '4': cyFailedSimpleX4,
        '8': cyFailedSimpleX8,
        '12': cyFailedSimpleX12,
        '16': cyFailedSolidX16,
        '24': cyFailedSolidX24,
      },
      outline: {
        '4': cyFailedSimpleX4,
        '8': cyFailedSimpleX8,
        '12': cyFailedSimpleX12,
        '16': cyFailedOutlineX16,
        '24': cyFailedOutlineX24,
      },
    },
    use: 'Runs, specs, groups, test results',
    link: 'https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Failed',
  },
  unclaimed: {
    iconName: 'queued',
    color: 'gray-100',
    iconSpin: false,
    defaultVariant: 'outline',
    variants: {
      outline: {
        '4': cyQueuedSimpleX4,
        '8': cyQueuedSimpleX8,
        '12': cyQueuedOutlineX12,
        '16': cyQueuedOutlineX16,
        '24': cyQueuedOutlineX24,
      },
    },
    use: 'Specs',
  },
  placeholder: {
    iconName: 'placeholder',
    color: 'gray-300',
    iconSpin: false,
    defaultVariant: 'solid',
    variants: {
      solid: {
        '4': cyPlaceholderSimpleX4,
        '8': cyPlaceholderSimpleX8,
        '12': cyPlaceholderSolidX12,
        '16': cyPlaceholderSolidX16,
        '24': cyPlaceholderSolidX24,
      },
    },
    use: 'Placeholder',
  },
  cancelled: {
    iconName: 'cancelled',
    color: 'gray-300',
    iconSpin: false,
    defaultVariant: 'solid',
    variants: {
      solid: {
        '4': cyCancelledSimpleX4,
        '8': cyCancelledSimpleX8,
        '12': cyCancelledSolidX12,
        '16': cyCancelledSolidX16,
        '24': cyCancelledSolidX24,
      },
      outline: {
        '4': cyCancelledSimpleX4,
        '8': cyCancelledSimpleX8,
        '12': cyCancelledSolidX12,
        '16': cyCancelledOutlineX16,
        '24': cyCancelledOutlineX24,
      },
    },
    use: 'Runs, specs, groups, test results',
  },
  noTests: {
    iconName: 'cancelled',
    color: 'gray-400',
    iconSpin: false,
    defaultVariant: 'solid',
    variants: {
      solid: {
        '4': cyCancelledSimpleX4,
        '8': cyCancelledSimpleX8,
        '12': cyCancelledSolidX12,
        '16': cyCancelledSolidX16,
        '24': cyCancelledSolidX24,
      },
      outline: {
        '4': cyCancelledSimpleX4,
        '8': cyCancelledSimpleX8,
        '12': cyCancelledSolidX12,
        '16': cyCancelledOutlineX16,
        '24': cyCancelledOutlineX24,
      },
    },
    use: 'Runs, specs, groups',
  },
  errored: {
    iconName: 'errored',
    color: 'orange-400',
    iconSpin: false,
    defaultVariant: 'solid',
    variants: {
      solid: {
        '4': cyErroredSimpleX4,
        '8': cyErroredSimpleX8,
        '12': cyErroredSolidX12,
        '16': cyErroredSolidX16,
        '24': cyErroredSolidX24,
      },
      outline: {
        '4': cyErroredSimpleX4,
        '8': cyErroredSimpleX8,
        '12': cyErroredSolidX12,
        '16': cyErroredOutlineX16,
        '24': cyErroredOutlineX24,
      },
    },
    use: 'Runs, specs, groups, test results',
  },
  timedOut: {
    iconName: 'errored',
    color: 'orange-400',
    iconSpin: false,
    defaultVariant: 'solid',
    variants: {
      solid: {
        '4': cyErroredSimpleX4,
        '8': cyErroredSimpleX8,
        '12': cyErroredSolidX12,
        '16': cyErroredSolidX16,
        '24': cyErroredSolidX24,
      },
      outline: {
        '4': cyErroredSimpleX4,
        '8': cyErroredSimpleX8,
        '12': cyErroredSolidX12,
        '16': cyErroredOutlineX16,
        '24': cyErroredOutlineX24,
      },
    },
    use: 'Runs, specs, groups, test results',
  },
  overLimit: {
    iconName: 'errored',
    color: 'orange-400',
    iconSpin: false,
    defaultVariant: 'solid',
    variants: {
      solid: {
        '4': cyErroredSimpleX4,
        '8': cyErroredSimpleX8,
        '12': cyErroredSolidX12,
        '16': cyErroredSolidX16,
        '24': cyErroredSolidX24,
      },
      outline: {
        '4': cyErroredSimpleX4,
        '8': cyErroredSimpleX8,
        '12': cyErroredSolidX12,
        '16': cyErroredOutlineX16,
        '24': cyErroredOutlineX24,
      },
    },
    use: 'Runs, specs, groups',
    link: 'https://docs.cypress.io/faq/questions/dashboard-faq#What-happens-once-I-reach-the-test-results-limit',
  },
  skipped: {
    iconName: 'skipped',
    color: 'gray-400',
    iconSpin: false,
    defaultVariant: 'outline',
    variants: {
      outline: {
        '4': cySkippedSimpleX4,
        '8': cySkippedSimpleX8,
        '12': cySkippedOutlineX12,
        '16': cySkippedOutlineX16,
        '24': cySkippedOutlineX24,
      },
    },
    use: 'Test results',
    link: 'https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Skipped',
  },
  pending: {
    iconName: 'pending',
    color: 'gray-300',
    iconSpin: false,
    defaultVariant: 'outline',
    variants: {
      outline: {
        '4': cyPendingSimpleX4,
        '8': cyPendingSimpleX8,
        '12': cyPendingOutlineX12,
        '16': cyPendingOutlineX16,
        '24': cyPendingOutlineX24,
      },
    },
    use: 'Test results',
    link: 'https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Pending',
  },
} as const

export const getDisplayVariant = (statusInfo, variant) => {
  if (statusInfo.variants[variant]) {
    return variant
  }

  // if the requested variant isn't an option, use the default
  return statusInfo.defaultVariant
}

export const sizes = ['4', '8', '12', '16', '24'] as const

export type Status = keyof typeof statuses

export type Size = typeof sizes[number]

export const variants = ['simple', 'solid', 'outline']

export type Variant = typeof variants[number]
