# SpecResults

## Install

The SpecResults component is contained in the `@cypress-design/react-spec-results` package (types and class constants are bundled in; there is no separate `constants-spec-results` to install). Vue is not implemented yet.

```bash
npm install @cypress-design/react-spec-results
```

or with yarn

```bash
yarn add @cypress-design/react-spec-results
```

## Usage

```ts
import { SpecResults } from '@cypress-design/react-spec-results'
```

```jsx live
import { SpecResults } from '@cypress-design/react-spec-results'

export default () => (
  <SpecResults
    results={{ failed: 1, passed: 18, skipped: 1, running: 2, queued: 3 }}
    onCancel={() => {}}
  />
)
```

A completed run drops the remaining pill and the Cancel button automatically:

```jsx live
import { SpecResults } from '@cypress-design/react-spec-results'

export default () => (
  <SpecResults results={{ failed: 1, passed: 28, skipped: 2 }} />
)
```

A run held open by the project's completion delay shows a countdown instead of a spec count:

```jsx live
import { SpecResults } from '@cypress-design/react-spec-results'

export default () => (
  <SpecResults
    results={{ failed: 1, passed: 28, skipped: 2 }}
    scheduledToComplete="60s"
  />
)
```
