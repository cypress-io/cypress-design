# Input

## Install

```bash
npm install @cypress-design/vue-input
```

or with yarn

```bash
yarn add @cypress-design/vue-input
```

## Usage

```js
import Input from '@cypress-design/vue-input'
```

```vue live
<template>
  <div class="bg-white p-1 rounded">
    <Input
      variant="invalid"
      isSearch
      placeholder="Search specs"
      :searchResults="{
        match: 7,
        total: 124,
        entity: 'specs',
      }"
    />
  </div>
</template>
```
