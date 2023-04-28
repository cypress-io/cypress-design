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

```tsx live
import Spinner from '@cypress-design/react-spinner'

export default () => (
  <div className="flex flex-col items-center justify-center gap-12px h-[20vh]">
    <Spinner />
    <h2 className="text-gray-700 text-size-16px leading-24px">
      Initializing something really important...
    </h2>
  </div>
)
```
