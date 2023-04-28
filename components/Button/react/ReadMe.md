# Button

## Install

```bash
npm install @cypress-design/react-button
```

or with yarn

```bash
yarn add @cypress-design/react-button
```

## Usage

```jsx live
import { IconActionPower } from '@cypress-design/react-icon'
import Button from '@cypress-design/react-button'
export default () => (
  <Button>
    <IconActionPower class="mr-2" />
    Button
  </Button>
)
```

## Possible variants

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
          className="px-[8px] py-[12px] flex flex-col items-center gap-[16px] rounded min-w-[180px]"
          style={{
            backgroundColor: variant === 'outline-dark' ? '#1a202c' : 'white',
            color: variant === 'outline-dark' ? 'white' : 'black',
          }}
        >
          {variant}
          {Object.keys(SizeClassesTable).map((size) => (
            <div className="flex gap-[8px] items-center">
              {size}
              <Button variant={variant} size={size}>
                Button
              </Button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
```
