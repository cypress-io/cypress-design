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
      <div className="p-4">
        <CypressMark className="w-[48px] h-[48px]" />
      </div>
      <div className="p-4">
        <CypressMark className="w-[48px] h-[48px]" variant="color-dark" />
      </div>
      <div className="p-4 bg-gray-1000 rounded">
        <CypressMark className="w-[48px] h-[48px]" variant="color-white" />
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
        <CypressLockUp className="w-[119px] h-[48px]" />
      </div>
      <div className="p-4">
        <CypressLockUp className="w-[119px] h-[48px]" variant="color-dark" />
      </div>
      <div className="bg-gray-1000 p-4 rounded">
        <CypressLockUp className="w-[119px] h-[48px]" variant="color-white" />
      </div>
    </div>
  )
}
```
