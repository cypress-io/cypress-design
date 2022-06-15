export type Status =
  | 'running'
  | 'passed'
  | 'failed'
  | 'unclaimed'
  | null
  | undefined
  | 'cancelled'
  | 'noTests'
  | 'errored'
  | 'timedOut'
  | 'overLimit'
  | 'skipped'
  | 'pending'

// TODO: remove this or getStatusInfo
export const statuses = {
  running: {
    iconName: 'running',
    // color: palette.indigo400,
    windiColor: 'indigo-400',
    iconSpin: true,
    variants: ['outline'],
    use: 'Runs, specs, groups, test results',
  },
  passed: {
    iconName: 'passed',
    // color: palette.jade400,
    windiColor: 'jade-400',
    iconSpin: false,
    variants: ['simple', 'solid', 'outline'],
    use: 'Runs, specs, groups, test results',
    // TODO: make these `on` links
    link: 'https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Passed',
  },
  failed: {
    iconName: 'failed',
    // color: palette.red400,
    windiColor: 'red-400',
    iconSpin: false,
    variants: ['simple', 'solid', 'outline'],
    use: 'Runs, specs, groups, test results',
    link: 'https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Failed',
  },
  unclaimed: {
    iconName: 'queued',
    // color: palette.gray100, // are colors needed?
    windiColor: 'gray-100',
    iconSpin: false,
    // TODO: maybe have a 'defaultVariant' here
    variants: ['outline'],
    use: 'Specs',
  },
  placeholder: {
    iconName: 'placeholder',
    // color: palette.gray300,
    windiColor: 'gray-300',
    iconSpin: false,
    variants: ['solid'],
    use: 'Placeholder',
  },
  cancelled: {
    iconName: 'cancelled',
    // color: palette.gray300,
    windiColor: 'gray-300',
    iconSpin: false,
    variants: ['solid', 'outline'],
    use: 'Runs, specs, groups, test results',
  },
  noTests: {
    iconName: 'cancelled',
    // color: palette.gray400,
    windiColor: 'gray-400',
    iconSpin: false,
    variants: ['solid', 'outline'],
    use: 'Runs, specs, groups',
  },
  errored: {
    iconName: 'errored',
    // color: palette.orange400,
    windiColor: 'orange-400',
    iconSpin: false,
    variants: ['solid', 'outline'],
    use: 'Runs, specs, groups, test results',
  },
  timedOut: {
    iconName: 'errored',
    // color: palette.orange400,
    windiColor: 'orange-400',
    iconSpin: false,
    variants: ['solid', 'outline'],
    use: 'Runs, specs, groups, test results',
  },
  overLimit: {
    iconName: 'errored',
    // color: palette.orange400,
    windiColor: 'orange-400',
    iconSpin: false,
    variants: ['solid', 'outline'],
    use: 'Runs, specs, groups',
    link: 'https://docs.cypress.io/faq/questions/dashboard-faq#What-happens-once-I-reach-the-test-results-limit',
  },
  skipped: {
    iconName: 'skipped',
    // color: palette.gray400,
    windiColor: 'gray-400',
    iconSpin: false,
    variants: ['outline'],
    use: 'Test results',
    link: 'https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Skipped',
  },
  pending: {
    iconName: 'pending',
    // color: palette.gray300,
    windiColor: 'gray-300',
    iconSpin: false,
    variants: ['outline'],
    use: 'Test results',
    link: 'https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Pending',
  },
}

export const sizes = ['4', '8', '12', '16', '24']

export const variants = ['simple', 'solid', 'outline']
