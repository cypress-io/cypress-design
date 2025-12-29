# Textbox

## Install

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

```vue live
<script setup>
import { ref } from 'vue'
import Textbox from '@cypress-design/vue-textbox'
const value = ref('Default text')
</script>

<template>
  <div class="flex flex-col gap-4 w-[360px]">
    <Textbox placeholder="Enter text..." />
    <Textbox :model-value="value" @update:model-value="value = $event" />
  </div>
</template>
```

The Textbox component is used to allow the user to enter text input. It supports various variants, sizes, rounded corners, optional labels, and icons.

## Variants

All available textbox variants:

```vue live
<script setup>
import { ref, computed } from 'vue'
import Textbox from '@cypress-design/vue-textbox'

const variants = ['default', 'valid', 'invalid', 'warning', 'disabled']

const values = ref({})

function getStateName(variant) {
  return variant.charAt(0).toUpperCase() + variant.slice(1)
}

function getValue(variant, dark = false) {
  const key = `textbox-${dark ? 'dark-' : ''}${variant}`
  return values.value[key] || getStateName(variant)
}

function setValue(variant, value, dark = false) {
  if (variant !== 'disabled') {
    const key = `textbox-${dark ? 'dark-' : ''}${variant}`
    values.value[key] = value
  }
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <!-- Light Mode -->
    <div class="flex flex-col gap-4">
      <h3 class="text-[16px] leading-[24px] font-medium text-gray-900">
        Light Mode
      </h3>
      <div class="flex flex-col gap-5 w-[360px]">
        <!-- Placeholder variant -->
        <div class="flex flex-col gap-2">
          <label class="text-[14px] leading-[20px] font-medium text-gray-600">
            Placeholder
          </label>
          <Textbox
            variant="default"
            size="40"
            :rounded="false"
            :dark-mode="false"
            placeholder="Placeholder"
            icon-left="general-placeholder"
          />
        </div>

        <!-- Other variants -->
        <div
          v-for="variant in variants"
          :key="variant"
          class="flex flex-col gap-2"
        >
          <label class="text-[14px] leading-[20px] font-medium text-gray-600">
            {{ getStateName(variant) }}
          </label>
          <Textbox
            :variant="variant"
            size="40"
            :rounded="false"
            :dark-mode="false"
            :disabled="variant === 'disabled'"
            :model-value="getValue(variant, false)"
            @update:model-value="(val) => setValue(variant, val, false)"
            icon-left="general-placeholder"
          />
        </div>
      </div>
    </div>

    <!-- Dark Mode -->
    <div class="flex flex-col gap-4 bg-gray-1000 p-[20px] rounded-[8px]">
      <h3 class="text-[16px] leading-[24px] font-medium text-white">
        Dark Mode
      </h3>
      <div class="flex flex-col gap-5 w-[360px]">
        <!-- Placeholder variant -->
        <div class="flex flex-col gap-2">
          <label class="text-[14px] leading-[20px] font-medium text-gray-400">
            Placeholder
          </label>
          <Textbox
            variant="default"
            size="40"
            :rounded="false"
            :dark-mode="true"
            placeholder="Placeholder"
            icon-left="general-placeholder"
          />
        </div>

        <!-- Other variants -->
        <div
          v-for="variant in variants"
          :key="variant"
          class="flex flex-col gap-2"
        >
          <label class="text-[14px] leading-[20px] font-medium text-gray-400">
            {{ getStateName(variant) }}
          </label>
          <Textbox
            :variant="variant"
            size="40"
            :rounded="false"
            :dark-mode="true"
            :disabled="variant === 'disabled'"
            :model-value="getValue(variant, true)"
            @update:model-value="(val) => setValue(variant, val, true)"
            icon-left="general-placeholder"
          />
        </div>
      </div>
    </div>
  </div>
</template>
```

## Sizes

All available textbox sizes:

```vue live
<script setup>
import { ref } from 'vue'
import Textbox from '@cypress-design/vue-textbox'

const sizes = ['32', '40', '48']
const values = ref({})

function getSizeName(size) {
  return `Size ${size}px`
}

function getValue(size, dark = false) {
  const key = `textbox-size-${dark ? 'dark-' : ''}${size}`
  return values.value[key] || getSizeName(size)
}

function setValue(size, value, dark = false) {
  const key = `textbox-size-${dark ? 'dark-' : ''}${size}`
  values.value[key] = value
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <!-- Light Mode -->
    <div class="flex flex-col gap-4">
      <h3 class="text-[16px] leading-[24px] font-medium text-gray-900">
        Light Mode
      </h3>
      <div class="flex flex-col gap-5 w-[360px]">
        <div v-for="size in sizes" :key="size" class="flex flex-col gap-2">
          <label class="text-[14px] leading-[20px] font-medium text-gray-600">
            {{ getSizeName(size) }}
          </label>
          <Textbox
            :size="size"
            :rounded="false"
            :dark-mode="false"
            :model-value="getValue(size, false)"
            @update:model-value="(val) => setValue(size, val, false)"
          />
        </div>
      </div>
    </div>

    <!-- Dark Mode -->
    <div class="flex flex-col gap-4 bg-gray-1000 p-[20px] rounded-[8px]">
      <h3 class="text-[16px] leading-[24px] font-medium text-white">
        Dark Mode
      </h3>
      <div class="flex flex-col gap-5 w-[360px]">
        <div v-for="size in sizes" :key="size" class="flex flex-col gap-2">
          <label class="text-[14px] leading-[20px] font-medium text-gray-400">
            {{ getSizeName(size) }}
          </label>
          <Textbox
            :size="size"
            :rounded="false"
            :dark-mode="true"
            :model-value="getValue(size, true)"
            @update:model-value="(val) => setValue(size, val, true)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
```

## Rounded

Rounded and not rounded variants:

```vue live
<script setup>
import { ref } from 'vue'
import Textbox from '@cypress-design/vue-textbox'

const roundedOptions = [
  { value: false, label: 'Not Rounded' },
  { value: true, label: 'Rounded' },
]
const values = ref({})

function getValue(rounded, dark = false) {
  const key = `textbox-rounded-${dark ? 'dark-' : ''}${rounded}`
  return (
    values.value[key] ||
    roundedOptions.find((opt) => opt.value === rounded)?.label ||
    ''
  )
}

function setValue(rounded, value, dark = false) {
  const key = `textbox-rounded-${dark ? 'dark-' : ''}${rounded}`
  values.value[key] = value
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <!-- Light Mode -->
    <div class="flex flex-col gap-4">
      <h3 class="text-[16px] leading-[24px] font-medium text-gray-900">
        Light Mode
      </h3>
      <div class="flex flex-col gap-5 w-[360px]">
        <div
          v-for="option in roundedOptions"
          :key="option.value"
          class="flex flex-col gap-2"
        >
          <label class="text-[14px] leading-[20px] font-medium text-gray-600">
            {{ option.label }}
          </label>
          <Textbox
            :rounded="option.value"
            size="40"
            :dark-mode="false"
            :model-value="getValue(option.value, false)"
            @update:model-value="(val) => setValue(option.value, val, false)"
          />
        </div>
      </div>
    </div>

    <!-- Dark Mode -->
    <div class="flex flex-col gap-4 bg-gray-1000 p-[20px] rounded-[8px]">
      <h3 class="text-[16px] leading-[24px] font-medium text-white">
        Dark Mode
      </h3>
      <div class="flex flex-col gap-5 w-[360px]">
        <div
          v-for="option in roundedOptions"
          :key="option.value"
          class="flex flex-col gap-2"
        >
          <label class="text-[14px] leading-[20px] font-medium text-gray-400">
            {{ option.label }}
          </label>
          <Textbox
            :rounded="option.value"
            size="40"
            :dark-mode="true"
            :model-value="getValue(option.value, true)"
            @update:model-value="(val) => setValue(option.value, val, true)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
```

## Labels

Textboxes with labels and icons:

```vue live
<script setup>
import { ref } from 'vue'
import Textbox from '@cypress-design/vue-textbox'
import Icon from '@cypress-design/vue-icon'

const sizes = ['32', '40', '48']
const values = ref({})

function getValue(key) {
  return values.value[key] || ''
}

function setValue(key, value) {
  values.value[key] = value
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <!-- Light Mode -->
    <div class="flex flex-col gap-4">
      <h3 class="text-[16px] leading-[24px] font-medium text-gray-900">
        Light Mode
      </h3>
      <div class="flex flex-col gap-8 w-[360px]">
        <div v-for="size in sizes" :key="size" class="flex flex-col gap-4">
          <h3 class="text-[16px] font-semibold text-gray-900">
            Size {{ size }}px
          </h3>
          <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-2">
              <label class="text-[12px] text-gray-600"
                >Labels and Icons (Left and Right)</label
              >
              <Textbox
                :size="size"
                :rounded="false"
                :dark-mode="false"
                label-left="Left"
                label-right="Right"
                icon-left="general-placeholder"
                icon-right="general-placeholder"
                :model-value="getValue(`textbox-${size}-all`)"
                @update:model-value="
                  (val) => setValue(`textbox-${size}-all`, val)
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dark Mode -->
    <div class="flex flex-col gap-4 bg-gray-1000 p-[20px] rounded-[8px]">
      <h3 class="text-[16px] leading-[24px] font-medium text-white">
        Dark Mode
      </h3>
      <div class="flex flex-col gap-8 w-[360px]">
        <div v-for="size in sizes" :key="size" class="flex flex-col gap-4">
          <h3 class="text-[16px] font-semibold text-white">
            Size {{ size }}px
          </h3>
          <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-2">
              <label class="text-[12px] text-gray-400"
                >Labels and Icons (Left and Right)</label
              >
              <Textbox
                :size="size"
                :rounded="false"
                :dark-mode="true"
                label-left="Left"
                label-right="Right"
                icon-left="general-placeholder"
                icon-right="general-placeholder"
                :model-value="getValue(`textbox-dark-${size}-all`)"
                @update:model-value="
                  (val) => setValue(`textbox-dark-${size}-all`, val)
                "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```

[figma::Textbox](https://www.figma.com/design/1DRMyEt2idRzHMmV0NTA3O/Component---Inputs-v1.0----latest?node-id=911-826&m=dev)
