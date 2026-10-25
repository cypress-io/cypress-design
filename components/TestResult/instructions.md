# TestResult — Props, Events & Slots

## Install

```bash
yarn add @cypress-design/vue-testresult          # Vue
yarn add @cypress-design/react-testresult        # React
yarn add @cypress-design/constants-testresult    # shared types + TestResults fixture
```

## Props

All props are derived from the `TestResultData` interface:

| Prop       | Type                                                                                                                                                                             | Default  | Description                                             |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------- |
| `status`   | `"running" \| "failing" \| "passed" \| "failed" \| "unclaimed" \| "placeholder" \| "cancelled" \| "noTests" \| "errored" \| "timedOut" \| "overLimit" \| "skipped" \| "pending"` | required | Result status, shown as a solid status icon             |
| `names`    | `string[]`                                                                                                                                                                       | required | Hierarchy of the test — the last item is the test title |
| `added`    | `boolean`                                                                                                                                                                        | `false`  | Shows an "added" icon                                   |
| `modified` | `boolean`                                                                                                                                                                        | `false`  | Shows a "modified" icon                                 |
| `flaky`    | `boolean`                                                                                                                                                                        | `false`  | Shows a flaky icon                                      |

React only:

| Prop        | Type              | Default | Description                                                                                 |
| ----------- | ----------------- | ------- | ------------------------------------------------------------------------------------------- |
| `groups`    | `React.ReactNode` | —       | Content rendered in the groups section below the row. The section is hidden when it's falsy |
| `children`  | `React.ReactNode` | —       | Per-row actions (e.g. a Test Replay button), rendered at the end of the row                 |
| `className` | `string`          | —       | Extra classes for the container                                                             |

React also passes any other `div` attributes (e.g. `onClick`) through to the container.

## Events

| Event   | Payload      | Description                     |
| ------- | ------------ | ------------------------------- |
| `click` | `MouseEvent` | Emitted when the row is clicked |

### click

```vue
<TestResult
  @click="(event: MouseEvent) => {
    // your code here
  }"
/>
```

In React, pass `onClick` instead.

## Slots

Vue only. In React, pass actions as `children` and groups as the `groups` prop.

| Slot      | Description                                              |
| --------- | -------------------------------------------------------- |
| `actions` | Per-row action buttons (e.g. Test Replay button)         |
| `groups`  | Content rendered inside the groups section below the row |
