# Alert

## Summary

Use the alert when you need a banner of some kind.
Examples:

- To give temporary information to the user.
- To attract attention to a specific note on the page.
- To inform the user of a change in the system.

## install

```bash
npm install @cypress-design/vue-alert
```

or with yarn

```bash
yarn add @cypress-design/vue-alert
```

## Usage

The simplest is to use with plain text. By default, type is `info`.

```vue
<script setup>
import Alert from '@cypress-design/vue-alert'
</script>
<template>
  <Alert type="error">Great Scott!!</Alert>
</template>
```

One can also have rich text in both the title and the body.

```vue
<template>
  <Alert>
    This is an <code>info</code> message
    <template #body>
      <p>This is the body of the alert.</p>
    </template>
  </Alert>
</template>
```

If you want the alert to be dismissible, you can add the `dismissible` prop. Don't forget to add the `@dismiss` prop to handle the dismiss event.

```vue
<template>
  <Alert
    title="This is an info message"
    dismissible
    @dismiss="() => setDismissed(true)"
  />
</template>
```

You can also remove the rounded corners and the icon of the alert by adding the `notRounded` and the `noIcon` props.

```vue
<template>
  <Alert type="warning" title="This is an info message" notRounded noIcon />
</template>
```
