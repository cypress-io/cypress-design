# Logo

## Install

```bash
npm install @cypress-design/react-logo
```

or with yarn

```bash
yarn add @cypress-design/react-logo
```

## Usage

```jsx live
import { CypressMark, CypressWatermark } from '@cypress-design/react-logo'

export default function () {
  return (
    <div className="flex items-center justify-center gap-8">
      <div className="p-4">
        <CypressMark className="text-gray-500" />
      </div>
      <div className="p-4">
        <CypressMark variant="color-dark" />
      </div>
      <div className="rounded bg-gray-1000 p-4">
        <CypressMark variant="color-white" />
      </div>
      <div className="rounded bg-gray-1000 p-4">
        <CypressWatermark />
      </div>
      <div className="p-4">
        <CypressWatermark dark />
      </div>
    </div>
  )
}
```

```jsx live
import { CypressLockUp } from '@cypress-design/react-logo'

export default function () {
  return (
    <div className="flex items-center justify-center gap-8">
      <div className="p-4">
        <CypressLockUp />
      </div>
      <div className="rounded bg-gray-1000 p-4">
        <CypressLockUp variant="white" />
      </div>
      <div className="p-4">
        <CypressLockUp variant="color-dark" />
      </div>
      <div className="rounded bg-gray-1000 p-4">
        <CypressLockUp variant="color-white" />
      </div>
    </div>
  )
}
```
