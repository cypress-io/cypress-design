# Alert

## Install

```bash
npm install @cypress-design/vue-alert
```

or with yarn

```bash
yarn add @cypress-design/vue-alert
```

## Usage

```ts
import Alert from '@cypress-design/vue-alert'
```

The simplest is to use with plain text. By default, type is `info`.

```vue live
<script setup>
import Alert from '@cypress-design/vue-alert'
</script>

<template>
  <Alert variant="error">Great Scott!!</Alert>
</template>
```

One can also have rich text in both the title and the body.

```jsx live
<Alert>
  This is an <code>info</code> message
  <template #body>
    <p>This is the body of the alert.</p>
  </template>
</Alert>
```

If you want the alert to be dismissible, you can add the `dismissible` prop. Don't forget to add the `@dismiss` prop to handle the dismiss event.

```jsx live
const dismissed = false

<Alert
  dismissible
  @dismiss="dismissed = true"
>
	This is an info message
</Alert>
<p v-if="dismissed">Alert dismissed</p>
```

You can also remove the rounded corners and the icon of the alert by adding the `notRounded` and the `noIcon` props.

```jsx live
<Alert variant="warning" notRounded noIcon>
  Look at my corners
</Alert>
```

```jsx live
<Alert variant="clear" notRounded noIcon>
  Look at my corners
</Alert>
```
