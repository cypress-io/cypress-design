# Textbox

## Install

The textbox component is contained in the `@cypress-design/react-textbox` package. You'll also want to install `@cypress-design/constants-textbox` to get proper types for TypeScript.

```bash
npm install @cypress-design/react-textbox @cypress-design/constants-textbox
```

or with yarn

```bash
yarn add @cypress-design/react-textbox @cypress-design/constants-textbox
```

## Usage

```ts
import Textbox from '@cypress-design/react-textbox'
```

```jsx
import { IconActionSearch } from '@cypress-design/react-icon'
import Textbox from '@cypress-design/react-textbox'

export default () => (
  <Textbox iconLeft={IconActionSearch} placeholder="Search..." />
)
```

## Possible variants

The Textbox component supports four variants: `default`, `valid`, `invalid`, and `warning`. Each variant has different visual styling to indicate the input state.

```jsx live
import Textbox from '@cypress-design/react-textbox'
export default () => (
  <div className="flex flex-col gap-4">
    <Textbox variant="default" placeholder="Default" />
    <Textbox variant="valid" placeholder="Valid" />
    <Textbox variant="invalid" placeholder="Invalid" />
    <Textbox variant="warning" placeholder="Warning" />
  </div>
)
```

## Sizes

The Textbox supports three sizes: `32`, `40` (default), and `48`.

```jsx live
import Textbox from '@cypress-design/react-textbox'
export default () => (
  <div className="flex flex-col gap-4">
    <Textbox size="32" placeholder="Size 32" />
    <Textbox size="40" placeholder="Size 40" />
    <Textbox size="48" placeholder="Size 48" />
  </div>
)
```
