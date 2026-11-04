# ProgressBar

## Install

```bash
npm install @cypress-design/react-progressbar
```

or with yarn

```bash
yarn add @cypress-design/react-progressbar
```

## Usage

```ts
import ProgressBar from '@cypress-design/react-progressbar'
```

```jsx live
import ProgressBar from '@cypress-design/react-progressbar'

export default () => <ProgressBar value={36} aria-label="Included tests used" />
```

Stack several values in one bar with `segments`:

```jsx live
import ProgressBar from '@cypress-design/react-progressbar'

export default () => (
  <ProgressBar
    max={412}
    aria-label="Test runs by mode"
    segments={[
      { value: 233, label: 'Open mode' },
      { value: 179, label: 'Run mode', color: 'teal' },
    ]}
  />
)
```
