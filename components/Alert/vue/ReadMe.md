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

```jsx live
<Alert variant="error">Great Scott!!</Alert>
```

One can also have rich text in both the title and the body.

```jsx live
<div class="bg-white p-4">
  <Alert>
    This is an <code>info</code> message
    <template #body>
      <p>This is the body of <b>the alert.</b></p>
    </template>
    <template #details>
      <p>This is the details of the alert.</p>
    </template>
  </Alert>
</div>
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

```vue live
<script setup>
import { ref } from 'vue'
import Button from '@cypress-design/vue-button'
const dismissed = ref(false)
</script>

<template>
  <div class="bg-white dark:bg-gray-800 p-4">
    <Alert variant="clear" dismissible @dismiss="dismissed = true">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="mr-2 inline"
      >
        <path
          d="M8 0L0.552002 2.656L1.688 12.504L8 16L14.312 12.504L15.448 2.656L8 0Z"
          fill="#DD0031"
        />
        <path
          d="M8 0L8.00001 1.776V1.768L8 16L14.312 12.504L15.448 2.656L8 0Z"
          fill="#C3002F"
        />
        <path
          d="M8.00001 1.768L3.34401 12.208H5.08001L6.01601 9.872H9.96801L10.904 12.208H12.64L8.00001 1.768ZM9.36001 8.432H6.64001L8.00001 5.16L9.36001 8.432Z"
          fill="white"
        />
      </svg>
      Angular component testing is available for this project
      <template #body>
        You can now use Cypress to develop and test individual components
        without running your whole application. Generate the config in just a
        few clicks.
      </template>
      <template #footer>
        <div class="p-4 flex gap-4">
          <Button variant="outline-indigo" size="32">Quick setup</Button>
          <Button variant="link" size="32">Read our guides</Button>
          <div class="flex-grow grow" />
          <Button variant="link" size="32">Give feedback</Button>
        </div>
      </template>
    </Alert>
    <p v-if="dismissed">Alert dismissed</p>
  </div>
</template>
```
