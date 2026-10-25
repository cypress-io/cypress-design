# Alert — Props, Events & Slots

## Install

```bash
yarn add @cypress-design/vue-alert        # Vue
yarn add @cypress-design/react-alert      # React
yarn add @cypress-design/constants-alert  # shared types
```

## Props

| Prop                      | Type                                                                  | Default                | Description                                                                                         |
| ------------------------- | --------------------------------------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------- |
| `variant`                 | `"info" \| "success" \| "error" \| "warning" \| "neutral" \| "clear"` | `"info"`               | Sets color scheme and icon. Only `success`, `error` and `warning` show a default icon               |
| `type`                    | same as `variant`                                                     | `"info"`               | Deprecated. Use `variant`, which wins when both are set                                             |
| `size`                    | `"xs" \| "sm" \| "md" \| "lg"`                                        | `"lg"`                 | Controls padding and font size                                                                      |
| `title` (React only)      | `ReactNode`                                                           | —                      | Required. Header text. In Vue, pass it in the default slot                                          |
| `details` (React only)    | `ReactNode`                                                           | —                      | Content of a collapsible details section. In Vue, use the `details` slot                            |
| `detailsTitle`            | `string`                                                              | `"Additional details"` | Label of the details toggle. Only shown when details are provided                                   |
| `footer` (React only)     | `ReactNode`                                                           | —                      | Box at the bottom for buttons or links. In Vue, use the `footer` slot                               |
| `customIcon` (React only) | `React.FC<React.SVGProps<SVGSVGElement>>`                             | —                      | Replaces the default icon. Receives `className` and `strokeColor`. In Vue, use the `icon` slot      |
| `noIcon`                  | `boolean`                                                             | `false`                | Hides the default icon. In React this also hides `customIcon`; in Vue the `icon` slot still renders |
| `notRounded`              | `boolean`                                                             | `false`                | Removes the rounded corners                                                                         |
| `dismissible`             | `boolean`                                                             | `false`                | Shows a close button. Clicking it hides the alert                                                   |
| `duration`                | `number`                                                              | —                      | Hides the alert after this many milliseconds                                                        |

## Events

| Event               | Payload | Description                                                                          |
| ------------------- | ------- | ------------------------------------------------------------------------------------ |
| `dismiss` (Vue)     | —       | Emitted when the alert is dismissed, by the close button or when `duration` runs out |
| `onDismiss` (React) | —       | Called when the alert is dismissed, by the close button or when `duration` runs out  |

The alert hides itself on dismiss in both frameworks.

### dismiss

```vue
<Alert
  @dismiss="
    () => {
      // your code here
    }
  "
/>
```

### onDismiss

```tsx
<Alert title="Saved" dismissible onDismiss={() => setDismissed(true)} />
```

## Slots

Vue only. In React, pass the title as `title`, the body as `children`, and details, footer and icon as the `details`, `footer` and `customIcon` props.

| Slot      | Description                                                              |
| --------- | ------------------------------------------------------------------------ |
| `default` | Title of the alert, shown in the header                                  |
| `body`    | Main body content, below the header                                      |
| `details` | Content of the collapsible details section                               |
| `footer`  | Box at the bottom for buttons or links                                   |
| `icon`    | Custom icon (replaces the default icon). Binds `strokeColor` and `class` |
