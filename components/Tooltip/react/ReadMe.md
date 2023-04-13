# Tooltip

## Summary

Use the tooltip component to display a message when the user hovers over an element.
For accessibility, it also triggers on focus.

To allow focus, one has to add `tabIndex="0"` to the Tooltip element.

```jsx live
export const comp = () => (
  <Tooltip tabIndex="0" popper={<b>popper</b>}>
    <span>Focus me</span>
  </Tooltip>
)
```

## Install

```bash
npm install @cypress-design/react-tooltip
```

or with yarn

```bash
yarn add @cypress-design/react-tooltip
```
