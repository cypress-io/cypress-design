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
