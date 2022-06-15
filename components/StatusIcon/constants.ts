export const statuses = {
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

export const sizes = ['4', '8', '12', '16', '24'] as const

export type Size = typeof sizes[number]

export const variants = ['simple', 'solid', 'outline']

export type Variant = typeof variants[number]
