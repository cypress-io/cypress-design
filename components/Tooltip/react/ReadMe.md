# Tooltip

## Summary

Use the tooltip component to display a message when the user hovers over an element.
For accessibility, it also triggers on focus.

To allow focus, one has to add `tabIndex="0"` to the Tooltip element.

```jsx
const comp = () => (
  <Tooltip tabIndex="0">
    <span>Focus me</span>
  </Tooltip>
)
```

## install

```bash
npm install @cypress-design/react-tooltip
```

or with yarn

```bash
yarn add @cypress-design/react-tooltip
```
