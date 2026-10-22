# Tooltip

## Install

```bash
npm install @cypress-design/react-tooltip
```

or with yarn

```bash
yarn add @cypress-design/react-tooltip
```

## Usage

```ts
import Tooltip from '@cypress-design/react-tooltip'
```

> tip: To allow focus, one has to add `tabIndex="0"` to the Tooltip element.

```jsx live
export const comp = () => (
  <div>
    <Tooltip className="inline-block" tabIndex="0" popper={<b>popper</b>}>
      <span>Focus me</span>
    </Tooltip>
  </div>
)
```

## Keyboard and screen readers

Keyboard focus on the trigger opens the tooltip, and Escape closes it. A mouse click doesn't pin it open.

With `interactive`, Tab from the open trigger moves into the tooltip's links and buttons. Shift+Tab from the first one returns to the trigger, Tab from the last one continues to the next control on the page, and Escape inside the tooltip returns focus to the trigger.

Pass a function as `children` to get `describedBy`, the id of the tooltip content, and put it on the trigger so screen readers read the tooltip as its description. It's `undefined` while the tooltip is closed. With plain children and `tabIndex={0}` on the Tooltip, the wrapper gets `aria-describedby` instead.

```jsx
<Tooltip
  interactive
  popper={
    <>
      Usage resets every month. <a href="/pricing">Learn more</a>
    </>
  }
>
  {({ describedBy }) => (
    <button type="button" aria-describedby={describedBy}>
      Plan limits
    </button>
  )}
</Tooltip>
```
