# Input

## Install

```bash
npm install @cypress-design/react-input
```

or with yarn

```bash
yarn add @cypress-design/react-input
```

## Usage

```ts
import Input from '@cypress-design/react-input'
```

```jsx live
import {
  default as Input,
  VariantClassesTable,
  SizeClassesTable,
} from '@cypress-design/react-input'

const Contrast = ({ children }) => (
  <div className="bg-white p-[2px] rounded">{children}</div>
)

export const InputComp = () => {
  return (
    <Contrast>
      <Input
        // className=""
        // value={value}
        // onChange={() => null}
        // customIcon={IconComponent}
        isSearch // adds MagnifyingGlass icon
        onReset={() => console.log('reset...')}
        placeholder="Search specs"
        searchResults={{
          match: 7,
          total: 124,
          entity: 'specs',
        }}
      />
    </Contrast>
  )
}
```

## Possible variants

```tsx live
import {
  default as Input,
  SizeClassesTable,
  VariantClassesTable,
} from '@cypress-design/react-input'

export default () => {
  return (
    <div className="flex flex-wrap justify-stretch gap-[8px]">
      {Object.keys(VariantClassesTable).map((variant) => (
        <div
          className="px-[8px] py-[12px] flex flex-col items-center gap-[16px] rounded min-w-[375px]"
          style={{
            backgroundColor: variant === 'outline-dark' ? '#1a202c' : 'white',
            color: variant === 'outline-dark' ? 'white' : 'black',
          }}
          key={variant}
        >
          <h3>{variant}</h3>
          {Object.keys(SizeClassesTable).map((size) => {
            return (
              <div className="flex gap-[8px] items-center" key={size}>
                {size}
                <Input
                  size={size}
                  variant={variant}
                  placeholder={'Placeholder'}
                />
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
```
