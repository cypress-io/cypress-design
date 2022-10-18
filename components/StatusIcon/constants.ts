import type { WindiColor } from '@cypress-design/icon-registry'
export type Variant = 'outline' | 'simple' | 'solid'
export type Size = '4' | '8' | '12' | '16' | '24'

type StatusInfo = {
  color: WindiColor
  link?: string
  use: string
  variants: readonly Variant[]
  secondaryColor?: WindiColor
  shouldSpin?: boolean
}

export type IconContents = {
  name: string
  data: string
}

export type IconSet = {
  size4Icon: IconContents
  size8Icon: IconContents
  size12Icon: IconContents
  size16Icon: IconContents
  size24Icon: IconContents
}

/**
 * This "const" is used to create the list of statuses
 */
const constStatuses = {
  running: {
    // <windi-keep strokeColor="indigo-400" />
    color: 'indigo-400',
    use: 'Runs, specs, groups, test results',
    variants: ['outline'],
    // <windi-keep fillColor="gray-100" />
    secondaryColor: 'gray-100',
    shouldSpin: true,
  },
  passed: {
    // <windi-keep strokeColor="jade-400" />
    color: 'jade-400',
    use: 'Runs, specs, groups, test results',
    link: 'https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Passed',
    variants: ['outline', 'simple', 'solid'],
  },
  failed: {
    // <windi-keep strokeColor="red-400" />
    color: 'red-400',
    use: 'Runs, specs, groups, test results',
    link: 'https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Failed',
    variants: ['outline', 'simple', 'solid'],
  },
  unclaimed: {
    // <windi-keep strokeColor="gray-100" />
    color: 'gray-100',
    use: 'Specs',
    variants: ['outline'],
  },
  placeholder: {
    // <windi-keep strokeColor="gray-300" />
    color: 'gray-300',
    use: 'Placeholder',
    variants: ['solid'],
  },
  cancelled: {
    // <windi-keep strokeColor="gray-300" />
    color: 'gray-300',
    use: 'Runs, specs, groups, test results',
    variants: ['outline', 'solid'],
  },
  noTests: {
    // <windi-keep strokeColor="orange-400" />
    color: 'orange-400',
    use: 'Runs, specs, groups',
    variants: ['outline', 'solid'],
  },
  errored: {
    // <windi-keep strokeColor="orange-400" />
    color: 'orange-400',
    use: 'Runs, specs, groups, test results',
    variants: ['outline', 'solid'],
  },
  timedOut: {
    // <windi-keep strokeColor="orange-400" />
    color: 'orange-400',
    use: 'Runs, specs, groups, test results',
    variants: ['outline', 'solid'],
  },
  overLimit: {
    // <windi-keep strokeColor="orange-400" />
    color: 'orange-400',
    use: 'Runs, specs, groups',
    link: 'https://docs.cypress.io/faq/questions/dashboard-faq#What-happens-once-I-reach-the-test-results-limit',
    variants: ['outline', 'solid'],
  },
  skipped: {
    // <windi-keep strokeColor="gray-400" />
    color: 'gray-400',
    use: 'Test results',
    link: 'https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Skipped',
    variants: ['outline'],
  },
  pending: {
    // <windi-keep strokeColor="gray-300" />
    color: 'gray-300',
    use: 'Test results',
    link: 'https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Pending',
    variants: ['outline'],
  },
} as const

export type statusTypes = keyof typeof constStatuses

/**
 * The status we have here, allow us to check the validity of the constant
 */
export const statuses: Record<statusTypes, StatusInfo> = constStatuses

export type VariantStatusIconProps = {
  size: Size
  /**
    If there is no status provided, a placeholder icon will be shown
  */
  status?: keyof typeof statuses | null | undefined
}
