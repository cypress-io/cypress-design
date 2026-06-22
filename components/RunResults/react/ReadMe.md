# RunResults

## Install

The RunResults component is contained in the `@cypress-design/react-runresults` package — a single package per framework (types and class constants are bundled in; there is no separate `constants-runresults` to install).

```bash
npm install @cypress-design/react-runresults
```

or with yarn

```bash
yarn add @cypress-design/react-runresults
```

## Usage

```ts
import { RunResults } from '@cypress-design/react-runresults'
```

```jsx live
import { RunResults } from '@cypress-design/react-runresults'

export default () => (
  <RunResults passed={120} failed={3} skipped={2} pending={1} flaky={4} />
)
```

Override the pill background (e.g. to blend into a colored surface) with `pillClassName` — it is merged via `tailwind-merge`, so it wins over the theme background:

```jsx live
import { RunResults } from '@cypress-design/react-runresults'

export default () => (
  <div className="bg-gray-900 p-4 rounded">
    <RunResults
      theme="dark"
      pillClassName="bg-gray-900"
      passed={120}
      failed={3}
      skipped={2}
      pending={1}
      flaky={4}
    />
  </div>
)
```
