# Registry of icons

Usage:

```tsx
import { IconActionDeleteCircle } from '@cypress-design/icon-registry';

export const CircleIcon = () => {
  return <IconActionDeleteCircle />;
};
```

## Build

### Generating types

Sample:

```ts
// lists all the colors available from windi classes
export type WindiColors = 'jade-200' | 'jade-300' | 'red-200' | 'red-300';

export type IconProps =
  | IIconActionDeleteCircleProps
  | IIconTestingTypeComponentProps;
// | ...

interface IIconActionDeleteCircleProps {
  iconId: 'action-delete-circle';
  color?: keyof typeof colors;
}

interface IIconTestingTypeComponentProps {
  iconId: 'testing-type-component';
  size?: 16 | 24 | 64 | 120;
  color?: keyof typeof colors;
  bgColor?: keyof typeof colors;
}
```

### Generating icons js files

-> index.js

```js
export * from


```
