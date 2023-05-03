# Tooltip

## Install

```bash
npm install @cypress-design/vue-tooltip
```

or with yarn

```bash
yarn add @cypress-design/vue-tooltip
```

## Usage

```ts
import Tooltip from '@cypress-design/vue-tooltip'
```

> tip: To allow focus, one has to add `tabIndex="0"` to the Tooltip element.

```vue live
<Tooltip class="inline-block" tabIndex="0">
	<span>Focus me</span>
	<template #popper>More info</template>
</Tooltip>
```
