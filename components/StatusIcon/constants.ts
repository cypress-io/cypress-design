// import type { SVGAttributes } from 'vue'

type Variant = 'outline' | 'simple' | 'solid'

type StatusInfo = {
  color: string
  link?: string
  use: string
  variants: Variant[]
}

export type IconContents = {
  name: string
  data: string
}

export type IconSet = {
  shouldSpin: boolean
  size4Icon: IconContents
  size8Icon: IconContents
  size12Icon: IconContents
  size16Icon: IconContents
  size24Icon: IconContents
}

export const statuses: Record<string, StatusInfo> = {
  running: {
    color: 'indigo-400',
    use: 'Runs, specs, groups, test results',
    variants: ['outline'],
  },
  passed: {
    color: 'jade-400',
    use: 'Runs, specs, groups, test results',
    link: 'https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Passed',
    variants: ['outline', 'simple', 'solid'],
  },
  failed: {
    color: 'red-400',
    use: 'Runs, specs, groups, test results',
    link: 'https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Failed',
    variants: ['outline', 'simple', 'solid'],
  },
  unclaimed: {
    color: 'gray-100',
    use: 'Specs',
    variants: ['outline'],
  },
  placeholder: {
    color: 'gray-300',
    use: 'Placeholder',
    variants: ['solid'],
  },
  cancelled: {
    color: 'gray-300',
    use: 'Runs, specs, groups, test results',
    variants: ['outline', 'solid'],
  },
  noTests: {
    color: 'gray-400',
    use: 'Runs, specs, groups',
    variants: ['outline', 'solid'],
  },
  errored: {
    color: 'orange-400',
    use: 'Runs, specs, groups, test results',
    variants: ['outline', 'solid'],
  },
  timedOut: {
    color: 'orange-400',
    use: 'Runs, specs, groups, test results',
    variants: ['outline', 'solid'],
  },
  overLimit: {
    color: 'orange-400',
    use: 'Runs, specs, groups',
    link: 'https://docs.cypress.io/faq/questions/dashboard-faq#What-happens-once-I-reach-the-test-results-limit',
    variants: ['outline', 'solid'],
  },
  skipped: {
    color: 'gray-400',
    use: 'Test results',
    link: 'https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Skipped',
    variants: ['outline'],
  },
  pending: {
    color: 'gray-300',
    use: 'Test results',
    link: 'https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests#Pending',
    variants: ['outline'],
  },
}

export type statusTypes = keyof typeof statuses

export type VariantStatusIconProps = {
  size?: '4' | '8' | '12' | '16' | '24'
  /**
    If there is no status provided, a placeholder icon will be shown
  */
  status?: keyof typeof statuses | null | undefined
}

export const getComponentProps: any = (
  statuses: Record<string, IconSet>,
  status: keyof typeof statuses | null | undefined,
  attributes: any, // TODO:
  size: '4' | '8' | '12' | '16' | '24'
) => {
  const statusInfo = status ? statuses[status] : statuses.placeholder

  const icon = statusInfo[`size${size}Icon`]

  const classes = `inline-block ${attributes.class || ''} ${
    statusInfo.shouldSpin && size !== '4' ? 'animate-spin' : ''
  }`

  Object.keys(attributes).forEach((key) => {
    if (key.endsWith('Color')) {
      // @ts-ignore
      delete attributes[key]
    }
  })
  const componentProps: any = {
    width: size,
    height: size,
    fill: 'none',
    innerHTML: icon.data,
    class: classes,
    ...attributes, // add all standard attributes back to the svg tag
  }
  return componentProps
}
