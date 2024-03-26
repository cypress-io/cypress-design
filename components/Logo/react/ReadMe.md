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
import { CypressMark } from '@cypress-design/react-logo'

export default function App() {
  return (
    <div className="flex items-center justify-center gap-8">
      <div className="p-4 ">
        <CypressMark className="text-gray-500" />
      </div>
      <div className="p-4">
        <CypressMark variant="color-dark" />
      </div>
      <div className="p-4 bg-gray-1000 rounded">
        <CypressMark variant="color-white" />
      </div>
      <div className="p-4 bg-gray-1000 rounded">
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

export default function App() {
  return (
    <div className="flex items-center justify-center gap-8">
      <div className="p-4">
        <CypressLockUp />
      </div>
      <div className="bg-gray-1000 p-4 rounded">
        <CypressLockUp variant="white" />
      </div>
      <div className="p-4">
        <CypressLockUp variant="color-dark" />
      </div>
      <div className="bg-gray-1000 p-4 rounded">
        <CypressLockUp variant="color-white" />
      </div>
    </div>
  )
}
```
