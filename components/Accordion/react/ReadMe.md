# Accordion

## Summary

Collapsible component with a header and a body.

## install

```bash
npm install @cypress-design/react-accordion
```

or with yarn

```bash
yarn add @cypress-design/react-accordion
```

## Usage

```tsx
import Accordion from '@cypress-design/react-accordion'
```

```tsx live
import { IconActionQuestionMarkCircle } from '@cypress-design/react-icon'

export default () => (
  <Accordion
    icon={IconActionQuestionMarkCircle}
    title="Accordion Title"
    description="Vestibulum id ligula porta felis euismod semper. Nulla... "
    separator
    open
    fullWidthContent
  >
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio dolore omnis
    nemo minus, sapiente magni ...
  </Accordion>
)
```
