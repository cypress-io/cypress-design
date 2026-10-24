# Spinner

## Install

```bash
npm install @cypress-design/react-spinner
```

or with yarn

```bash
yarn add @cypress-design/react-spinner
```

## Usage

```ts
import Spinner from '@cypress-design/react-spinner'
```

```tsx live
import Spinner from '@cypress-design/react-spinner'

export default () => (
  <div className="flex h-[20vh] flex-col items-center justify-center gap-[12px]">
    <Spinner />
    <h2 className="text-size-16px leading-[24px] text-gray-700">
      Initializing something really important...
    </h2>
  </div>
)
```
