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

While open, the Tooltip wrapper gets `aria-describedby` pointing at the tooltip content, so put `tabIndex={0}` on the Tooltip when the wrapper is the trigger.
