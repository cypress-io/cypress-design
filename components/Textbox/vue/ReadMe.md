# Textbox

## Install

The textbox component is contained in the `@cypress-design/vue-textbox` package. You'll also want to install `@cypress-design/constants-textbox` to get proper types for TypeScript.

```bash
npm install @cypress-design/vue-textbox @cypress-design/constants-textbox
```

or with yarn

```bash
yarn add @cypress-design/vue-textbox @cypress-design/constants-textbox
```

## Usage

```ts
import Textbox from '@cypress-design/vue-textbox'
```

```vue
<script lang="ts" setup>
import { IconShapeLightningBolt } from '@cypress-design/vue-icon'
import Textbox from '@cypress-design/vue-textbox'
</script>

<template>
  <Textbox :icon-left="IconShapeLightningBolt" placeholder="Search..." />
</template>
```

## Possible variants

The Textbox component supports four variants: `default`, `valid`, `invalid`, and `warning`. Each variant has different visual styling to indicate the input state.

### Placeholders

All variants with placeholder text:

```vue live
<script lang="ts" setup>
import Textbox from '@cypress-design/vue-textbox'
</script>

<template>
  <div class="bg-white p-4 rounded">
    <div class="flex flex-col gap-4">
      <Textbox variant="default" placeholder="Default placeholder" />
      <Textbox variant="valid" placeholder="Valid placeholder" />
      <Textbox variant="invalid" placeholder="Invalid placeholder" />
      <Textbox variant="warning" placeholder="Warning placeholder" />
    </div>
  </div>
</template>
```

### Types

All variants with values:

```vue live
<script lang="ts" setup>
import Textbox from '@cypress-design/vue-textbox'
</script>

<template>
  <div class="bg-white p-4 rounded">
    <div class="flex flex-col gap-4">
      <Textbox variant="default" value="Default" />
      <Textbox variant="valid" value="Valid" />
      <Textbox variant="invalid" value="Invalid" />
      <Textbox variant="warning" value="Warning" />
      <Textbox disabled value="Disabled" />
    </div>
  </div>
</template>
```

### Dark mode

All variants in dark mode with placeholders:

```vue live
<script lang="ts" setup>
import Textbox from '@cypress-design/vue-textbox'
</script>

<template>
  <div class="bg-gray-1000 p-4 rounded">
    <div class="flex flex-col gap-4">
      <Textbox theme="dark" variant="default" placeholder="Default" />
      <Textbox theme="dark" variant="valid" placeholder="Valid" />
      <Textbox theme="dark" variant="invalid" placeholder="Invalid" />
      <Textbox theme="dark" variant="warning" placeholder="Warning" />
    </div>
  </div>
</template>
```

All variants in dark mode with values:

```vue live
<script lang="ts" setup>
import Textbox from '@cypress-design/vue-textbox'
</script>

<template>
  <div class="bg-gray-1000 p-4 rounded">
    <div class="flex flex-col gap-4">
      <Textbox theme="dark" variant="default" value="Default" />
      <Textbox theme="dark" variant="valid" value="Valid" />
      <Textbox theme="dark" variant="invalid" value="Invalid" />
      <Textbox theme="dark" variant="warning" value="Warning" />
      <Textbox theme="dark" disabled value="Disabled" />
    </div>
  </div>
</template>
```

## Sizes

The Textbox supports three sizes: `32`, `40` (default), and `48`.

```vue live
<script lang="ts" setup>
import Textbox from '@cypress-design/vue-textbox'
</script>

<template>
  <div class="bg-white p-4 rounded">
    <div class="flex flex-col gap-4">
      <Textbox size="32" value="Size 32" />
      <Textbox size="40" value="Size 40" />
      <Textbox size="48" value="Size 48" />
    </div>
  </div>
</template>
```

Dark mode:

```vue live
<script lang="ts" setup>
import Textbox from '@cypress-design/vue-textbox'
</script>

<template>
  <div class="bg-gray-1000 p-4 rounded">
    <div class="flex flex-col gap-4">
      <Textbox theme="dark" size="32" value="Size 32" />
      <Textbox theme="dark" size="40" value="Size 40" />
      <Textbox theme="dark" size="48" value="Size 48" />
    </div>
  </div>
</template>
```

## Rounded

The Textbox supports a `rounded` prop to toggle between rounded and square corners. Shown here with size 40px:

```vue live
<script lang="ts" setup>
import Textbox from '@cypress-design/vue-textbox'
</script>

<template>
  <div class="bg-white p-4 rounded">
    <div class="flex flex-col gap-4">
      <Textbox size="40" :rounded="false" value="Not rounded" />
      <Textbox size="40" :rounded="true" value="Rounded" />
    </div>
  </div>
</template>
```

Dark mode:

```vue live
<script lang="ts" setup>
import Textbox from '@cypress-design/vue-textbox'
</script>

<template>
  <div class="bg-gray-1000 p-4 rounded">
    <div class="flex flex-col gap-4">
      <Textbox theme="dark" size="40" :rounded="false" value="Not rounded" />
      <Textbox theme="dark" size="40" :rounded="true" value="Rounded" />
    </div>
  </div>
</template>
```

## Options

The Textbox supports various combinations of optional elements. All sizes with labels on the left and right:

```vue live
<script lang="ts" setup>
import Textbox from '@cypress-design/vue-textbox'
import { IconShapeLightningBolt } from '@cypress-design/vue-icon'
</script>

<template>
  <div class="bg-white p-4 rounded">
    <div class="flex flex-col gap-4">
      <Textbox
        :divider="true"
        size="32"
        label-left="Label left"
        label-right="Label right"
        value="Size 32"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :divider="true"
        size="40"
        label-left="Label left"
        label-right="Label right"
        value="Size 40"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :divider="true"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Size 48"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :divider="true"
        variant="valid"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Size 48"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :divider="true"
        variant="invalid"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Size 48"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :divider="true"
        variant="warning"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Size 48"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        disabled
        :divider="true"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="disabled"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :rounded="true"
        :divider="true"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Size 48"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
    </div>
  </div>
</template>
```

Dark mode:

```vue live
<script lang="ts" setup>
import Textbox from '@cypress-design/vue-textbox'
import { IconShapeLightningBolt } from '@cypress-design/vue-icon'
</script>

<template>
  <div class="bg-gray-1000 p-4 rounded">
    <div class="flex flex-col gap-4">
      <Textbox
        :divider="true"
        theme="dark"
        size="32"
        label-left="Label left"
        label-right="Label right"
        value="Size 32"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :divider="true"
        theme="dark"
        size="40"
        label-left="Label left"
        label-right="Label right"
        value="Size 40"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :divider="true"
        theme="dark"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Size 48"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :divider="true"
        theme="dark"
        variant="valid"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Size 48"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :divider="true"
        theme="dark"
        variant="invalid"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Size 48"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :divider="true"
        theme="dark"
        variant="warning"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Size 48"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        disabled
        :divider="true"
        theme="dark"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="disabled"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
      <Textbox
        :rounded="true"
        theme="dark"
        :divider="true"
        size="48"
        label-left="Label left"
        label-right="Label right"
        value="Size 48"
        :icon-left="IconShapeLightningBolt"
        :icon-right="IconShapeLightningBolt"
      />
    </div>
  </div>
</template>
```

## Template Refs

The Textbox component supports template refs, allowing you to access the underlying input element directly:

```vue
<template>
  <div>
    <Textbox ref="inputRef" placeholder="Type here..." />
    <button @click="handleFocus">Focus Input</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Textbox from '@cypress-design/vue-textbox'

const inputRef = ref<InstanceType<typeof Textbox> | null>(null)

const handleFocus = () => {
  // Access the input element through the component instance
  const input = inputRef.value?.$el?.querySelector('input')
  input?.focus()
}
</script>
```

This is useful for:

- Programmatically focusing the input
- Accessing input methods like `select()`, `setSelectionRange()`
- Integrating with third-party libraries that need direct DOM access

## Keyboard Event Handlers

The Textbox component supports keyboard event handlers for advanced interactions:

```vue
<template>
  <Textbox
    placeholder="Press Enter..."
    @keydown="handleKeyDown"
    @keyup="handleKeyUp"
    @keypress="handleKeyPress"
  />
</template>

<script setup lang="ts">
import Textbox from '@cypress-design/vue-textbox'

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    console.log('Enter pressed')
  }
}

const handleKeyUp = (e: KeyboardEvent) => {
  console.log('Key released:', e.key)
}

const handleKeyPress = (e: KeyboardEvent) => {
  console.log('Key pressed:', e.key)
}
</script>
```

### Available Keyboard Events

- **@keydown**: Fired when a key is pressed down
- **@keyup**: Fired when a key is released
- **@keypress**: Fired when a printable character key is pressed

## Common Input Attributes

The Textbox component supports all standard HTML input attributes. This includes:

### Form Attributes

- **readonly**: Makes the input read-only
- **required**: Marks the input as required for form validation
- **name**: Input name for form submission
- **form**: Associates input with a form element

### Validation Attributes

- **maxlength**: Maximum number of characters
- **minlength**: Minimum number of characters
- **pattern**: Regular expression pattern for validation
- **title**: Tooltip text shown on validation error

### Other Attributes

- **readonly**: Alias for readonly
- **tabindex**: Tab order
- **autocomplete**: Autocomplete behavior
- **spellcheck**: Enable/disable spell checking

Example:

```vue
<Textbox
  placeholder="Username"
  name="username"
  required
  maxlength="20"
  minlength="3"
  pattern="[a-zA-Z0-9]+"
  title="Username must be 3-20 alphanumeric characters"
/>
```

## Real-World Use Cases

### Form Input with Validation

```vue
<template>
  <div>
    <Textbox
      type="email"
      placeholder="Email"
      v-model="email"
      @blur="validateEmail"
      :variant="error ? 'invalid' : 'default'"
      :aria-describedby="error ? 'email-error' : undefined"
    />
    <div v-if="error" id="email-error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Textbox from '@cypress-design/vue-textbox'

const email = ref('')
const error = ref('')

const validateEmail = () => {
  if (!email.value.includes('@')) {
    error.value = 'Invalid email address'
  } else {
    error.value = ''
  }
}
</script>
```

### Search Input with Keyboard Shortcuts

```vue
<template>
  <Textbox
    ref="inputRef"
    :icon-left="IconActionSearch"
    placeholder="Search (press / to focus)"
    @keydown="handleKeyDown"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Textbox from '@cypress-design/vue-textbox'
import { IconActionSearch } from '@cypress-design/vue-icon'

const inputRef = ref<InstanceType<typeof Textbox> | null>(null)

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    const input = inputRef.value?.$el?.querySelector('input')
    input?.blur()
  }
}

onMounted(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (
      e.key === '/' &&
      e.target !== inputRef.value?.$el?.querySelector('input')
    ) {
      e.preventDefault()
      const input = inputRef.value?.$el?.querySelector('input')
      input?.focus()
    }
  }

  window.addEventListener('keydown', handleKeyPress)
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress)
  })
})
</script>
```

### Controlled Input with Debouncing

```vue
<template>
  <div>
    <Textbox v-model="value" placeholder="Search..." />
    <p>Searching for: {{ debouncedValue }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Textbox from '@cypress-design/vue-textbox'

const value = ref('')
const debouncedValue = ref('')

let timeoutId: ReturnType<typeof setTimeout>

watch(value, (newValue) => {
  clearTimeout(timeoutId)
  timeoutId = setTimeout(() => {
    debouncedValue.value = newValue
  }, 300)
})
</script>
```

## Props

(Props section will be auto-generated by vue-docgen-cli)
