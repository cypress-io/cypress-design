# Icon

## Usage

The simple way using the Icon component

```tsx live
import Icon from '@cypress-design/react-icon'

export const MyButtonWithIcon = () => {
  return (
    <button class="flex items-center gap-[8px] p-[8px] border-1 border-red-500">
      <Icon
        name="object-book"
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

```tsx live
import { IconObjectBook } from '@cypress-design/react-icon'

export const MyButtonWithIcon = () => {
  return (
    <IconObjectBook size="16" strokeColor="indigo-600" fillColor="red-200" />
  )
}
```

Should you need to change the color of the icon on `hover` or `focus` prefix the props with these words.

Here, the `strokeColor` will change on hover from indigo to jade

```tsx live
import { IconObjectBook } from '@cypress-design/react-icon'

export const MyButtonWithIcon = () => {
  return (
    <button>
      <IconObjectBook
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

```tsx live
import { IconObjectBook } from '@cypress-design/react-icon'

export const MyButtonWithIcon = () => {
  return (
    <button className="flex items-center gap-[8px] group hover:text-jade-800">
      <IconObjectBook
        size="48"
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
