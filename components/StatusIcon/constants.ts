export type StatusInfo = {
  iconName: string
  color: string
  iconSpin: boolean
  variants: string[]
  use: string
}

export const statuses: StatusInfo[] = {
  running: {
    iconName: 'running',
    color: 'indigo-400',
    iconSpin: true,
    variants: ['outline'],
    use: 'Runs, specs, groups, test results',
  },
  passed: {
    iconName: 'passed',
    color: 'jade-400',
    iconSpin: false,
    variants: ['simple', 'solid', 'outline'],
    use: 'Runs, specs, groups, test results',
    link: 'https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Passed',
  },
  failed: {
    iconName: 'failed',
    color: 'red-400',
    iconSpin: false,
    variants: ['simple', 'solid', 'outline'],
    use: 'Runs, specs, groups, test results',
    link: 'https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Failed',
  },
  unclaimed: {
    iconName: 'queued',
    color: 'gray-100',
    iconSpin: false,
    variants: ['outline'],
    use: 'Specs',
  },
  placeholder: {
    iconName: 'placeholder',
    color: 'gray-300',
    iconSpin: false,
    variants: ['solid'],
    use: 'Placeholder',
  },
  cancelled: {
    iconName: 'cancelled',
    color: 'gray-300',
    iconSpin: false,
    variants: ['solid', 'outline'],
    use: 'Runs, specs, groups, test results',
  },
  noTests: {
    iconName: 'cancelled',
    color: 'gray-400',
    iconSpin: false,
    variants: ['solid', 'outline'],
    use: 'Runs, specs, groups',
  },
  errored: {
    iconName: 'errored',
    color: 'orange-400',
    iconSpin: false,
    variants: ['solid', 'outline'],
    use: 'Runs, specs, groups, test results',
  },
  timedOut: {
    iconName: 'errored',
    color: 'orange-400',
    iconSpin: false,
    variants: ['solid', 'outline'],
    use: 'Runs, specs, groups, test results',
  },
  overLimit: {
    iconName: 'errored',
    color: 'orange-400',
    iconSpin: false,
    variants: ['solid', 'outline'],
    use: 'Runs, specs, groups',
    link: 'https://docs.cypress.io/faq/questions/dashboard-faq#What-happens-once-I-reach-the-test-results-limit',
  },
  skipped: {
    iconName: 'skipped',
    color: 'gray-400',
    iconSpin: false,
    variants: ['outline'],
    use: 'Test results',
    link: 'https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Skipped',
  },
  pending: {
    iconName: 'pending',
    color: 'gray-300',
    iconSpin: false,
    variants: ['outline'],
    use: 'Test results',
    link: 'https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Pending',
  },
}

// TODO: write a test for what these should default to
// TODO: write a test that loading should spin, the others should not, and loading x4 should not spin
export const getDisplayVariant = (statusInfo, size, variant) => {
  if (size === '4' || size === '8' || size === '12') {
    // there's only one variant of small ones: return the default
    return statusInfo.variants[0]
  }

  if (statusInfo.variants?.includes(variant)) {
    return variant
  }

  // if the requested variant isn't an option, default to the first one in the variants list
  return statusInfo.variants[0]
}

export const sizes = ['4', '8', '12', '16', '24'] as const

export type Size = typeof sizes[number]

export const variants = ['simple', 'solid', 'outline']

export type Variant = typeof variants[number]
