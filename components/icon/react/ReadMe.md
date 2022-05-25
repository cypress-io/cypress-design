# Icon

## Usage

The simple way using the Icon component

```tsx
import { Icon } from '@cypress-design/react-icon'

export const MyButtonWithIcon = () => {
  return (
    <button>
      <Icon
        name="book"
        size="16"
        strokeColor="blue-600"
        fillColor="red-200"
        className="bg-red-100"
      />
      Read
    </button>
  )
}
```

The tree-shakable way (more optimized)

```tsx
import { IconBook } from '@cypress-design/react-icon'

export const MyButtonWithIcon = () => {
  return (
    <button>
      <IconBook size="16" strokeColor="blue-600" fillColor="red-200" />
    </button>
  )
}
```

## install

```bash
npm install @cypress-design/react-icon
```

or with yarn

```bash
yarn add @cypress-design/react-icon
```
