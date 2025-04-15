# Button

## Install

The button component is contained in the `@cypress-design/react-button` package. You'll also want to install `@cypress-design/constants-button` to get proper types for TypeScript.

```bash
npm install @cypress-design/react-button @cypress-design/constants-button
```

or with yarn

```bash
yarn add @cypress-design/react-button @cypress-design/constants-button
```

## Usage

```ts
import Button from '@cypress-design/react-button'
```

```jsx live
import { IconActionPower } from '@cypress-design/react-icon'
import Button from '@cypress-design/react-button'
export default () => (
  <Button>
    <IconActionPower className="mr-2" />
    Button
  </Button>
)
```

Square buttons

```jsx live
import { IconActionPower } from '@cypress-design/react-icon'
import Button from '@cypress-design/react-button'
export default () => (
  <div className="flex gap-4 items-center">
    {[20, 24, 32, 40, 48].map((size) => (
      <Button key={size} size={size} square>
        <IconActionPower
          style={{ width: `${size / 2}px`, height: `${size / 2}px` }}
        />
      </Button>
    ))}
  </div>
)
```

## Possible variants

Variants and their available sizes plus styles when `disabled` is set to `true` (represented as 🚫).

```tsx live
import {
  default as Button,
  VariantClassesTable,
  SizeClassesTable,
} from '@cypress-design/react-button'

export default () => {
  return (
    <div className="flex flex-wrap justify-stretch gap-[8px]">
      {Object.keys(VariantClassesTable).map((variant) => (
        <div
          key={variant}
          className="px-[8px] py-[12px] flex flex-col items-center gap-[16px] rounded min-w-[180px]"
          style={{
            backgroundColor:
              variant === 'outline-dark' ||
              variant === 'outline-red-dark-mode' ||
              variant === 'outline-jade-dark-mode' ||
              variant === 'outline-indigo-dark-mode' ||
              variant === 'red-dark-mode'
                ? '#1a202c'
                : 'white',
            color:
              variant === 'outline-dark' ||
              variant === 'outline-red-dark-mode' ||
              variant === 'outline-jade-dark-mode' ||
              variant === 'outline-indigo-dark-mode' ||
              variant === 'red-dark-mode'
                ? 'white'
                : 'black',
          }}
        >
          {variant}
          {Object.keys(SizeClassesTable).map((size) => (
            <div key={size} className="flex gap-[8px] items-center">
              {size}
              <Button variant={variant} size={size}>
                Button
              </Button>
            </div>
          ))}
          <div key={variant} className="flex gap-[8px] items-center">
            🚫
            <Button variant={variant} size="48" disabled="true">
              Button
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
```
