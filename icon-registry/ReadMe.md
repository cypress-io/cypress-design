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
import type { colors } from '@cypress-design/css';

export type IconProps =
  | IconActionDeleteCircleProps
  | IconTestingTypeComponentProps;
// | ...

interface IconActionDeleteCircleProps {
  iconId: 'action-delete-circle';
  color?: keyof typeof colors;
}

interface IconTestingTypeComponentProps {
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
