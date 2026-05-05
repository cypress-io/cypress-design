# Accordion — Props, Events & Slots

## Install

```bash
yarn add @cypress-design/vue-accordion        # Vue
yarn add @cypress-design/react-accordion      # React
```

## Props

| Prop          | Type      | Default | Description                              |
| ------------- | --------- | ------- | ---------------------------------------- |
| `title`       | `string`  | —       | Header text displayed in the summary row |
| `description` | `string`  | —       | Secondary text displayed below the title |
| `icon`        | component | —       | Icon displayed to the left of the title  |
| `open`        | `boolean` | `false` | Controls expanded state                  |

## Events

| Event         | Payload   | Description                           |
| ------------- | --------- | ------------------------------------- |
| `update:open` | `boolean` | Emitted when the accordion is toggled |

### update:open

```vue
<Accordion
  @update:open="(value: boolean) => {
    // your code here
  }"
/>
```

## Slots

| Slot      | Description                                   |
| --------- | --------------------------------------------- |
| `default` | Content rendered inside the expanded body     |
| `title`   | Custom title content (overrides `title` prop) |
| `icon`    | Custom icon (overrides `icon` prop)           |
