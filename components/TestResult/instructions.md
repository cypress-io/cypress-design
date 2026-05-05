# TestResult — Props, Events & Slots

## Install

```bash
yarn add @cypress-design/vue-testresult          # Vue
yarn add @cypress-design/react-testresult        # React
yarn add @cypress-design/constants-testresult    # shared types + TestResults fixture
```

## Props

All props are derived from the `TestResultData` interface plus a required `status`:

| Prop         | Type                                                                                 | Default  | Description                                            |
| ------------ | ------------------------------------------------------------------------------------ | -------- | ------------------------------------------------------ |
| `status`     | `"passed" \| "failed" \| "pending" \| "skipped" \| "running" \| "notRun" \| "flaky"` | required | Result status                                          |
| `names`      | `string[]`                                                                           | required | Spec path segments — last item is the test title       |
| `duration`   | `number`                                                                             | —        | Test duration in ms                                    |
| `groups`     | `string[]`                                                                           | —        | Sub-group labels (enables the expand/collapse chevron) |
| `isNew`      | `boolean`                                                                            | `false`  | Shows a "new" badge                                    |
| `isModified` | `boolean`                                                                            | `false`  | Shows a "modified" badge                               |
| `isFlaky`    | `boolean`                                                                            | `false`  | Shows a flaky indicator icon                           |

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

## Slots

| Slot      | Description                                         |
| --------- | --------------------------------------------------- |
| `actions` | Per-row action buttons (e.g. Test Replay button)    |
| `groups`  | Content rendered inside the expanded groups section |
