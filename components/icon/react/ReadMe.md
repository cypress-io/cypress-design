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
      <IconBook size="16" strokeColor="indigo-600" fillColor="red-200" />
    </button>
  )
}
```

Should you need to change the color of the icon on `hover` or `focus` prefix the props with these words.

Here, the `strokeColor` will change on hover from indigo to jade

```tsx
import { IconBook } from '@cypress-design/react-icon'

export const MyButtonWithIcon = () => {
  return (
    <button>
      <IconBook
        size="16"
        strokeColor="indigo-600"
        hoverStrokeColor="jade-600"
      />
    </button>
  )
}
```

If you need the `hover` or `focus` effect to be triggered on the parent group, use `interactiveColorsOnGroup`.
This prop will change all the pseudo prefixes to be group focused instead of triggered by the icon itself.

To achieve the same goal, in WindiCSS, we would use `group-hover:` instead of `hover:`.

```tsx
import { IconBook } from '@cypress-design/react-icon'

export const MyButtonWithIcon = () => {
  return (
    <button className="group hover:text-jade-800">
      <IconBook
        size="16"
        strokeColor="indigo-600"
        hoverStrokeColor="jade-600"
        interactiveColorsOnGroup
      />
      Book
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
