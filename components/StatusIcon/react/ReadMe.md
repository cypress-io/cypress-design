# StatusIcon

## Install

```bash
npm install @cypress-design/react-statusicon
```

or with yarn

```bash
yarn add @cypress-design/react-statusicon
```

## Usage

```ts
import StatusIcon from '@cypress-design/react-statusicon'
```

The simple way of using the StatusIcon component

```tsx
import StatusIcon from '@cypress-design/react-statusicon'

export default () => <StatusIcon size="16" status="failed" variant="solid" />
```

The tree-shakable way (more optimized)

```tsx
import { SolidStatusIcon } from '@cypress-design/react-statusicon'

export default () => <SolidStatusIcon size="16" status="failed" />
```
