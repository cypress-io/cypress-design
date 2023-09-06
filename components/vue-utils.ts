import { AllowedComponentProps, Component, VNodeProps } from 'vue'

/**
 * Extract component props from a component constructor type.
 * @example `ComponentProps<typeof MyComponent>`
 */
export type ComponentProps<C extends Component> = C extends new (
  ...args: any
) => any
  ? Omit<
      InstanceType<C>['$props'],
      keyof VNodeProps | keyof AllowedComponentProps
    >
  : never
