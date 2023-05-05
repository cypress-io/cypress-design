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
// import Input from '@cypress-design/react-input'

const Contrast = ({ children }) => (
  <div className="bg-white p-[16px] rounded">{children}</div>
)

export const InputComp = () => {
  return (
    <Contrast>
      <Input
        isSearch
        placeholder={'Search spec files'}
        onReset={() => console.log('reset search...')}
        variant="disabled"
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
