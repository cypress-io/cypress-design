# Logo

## Install

```bash
npm install @cypress-design/vue-logo
```

or with yarn

```bash
yarn add @cypress-design/vue-logo
```

## Usage

```vue live
<div class="flex items-center justify-center gap-8">
  <div class="p-4">
    <CypressMark class="text-gray-500" />
  </div>
  <div class="p-4">
    <CypressMark variant="color-dark" />
  </div>
  <div class="p-4 bg-gray-1000 rounded">
    <CypressMark variant="color-white" />
  </div>
  <div class="p-4 bg-gray-1000 rounded">
    <CypressWatermark />
  </div>
  <div class="p-4">
    <CypressWatermark dark/>
  </div>
</div>
```

```vue live
<div class="flex items-center justify-center gap-8">
  <div class="p-4">
    <CypressLockUp dark/>
  </div>
  <div class="bg-gray-1000 p-4 rounded">
    <CypressLockUp variant="white" />
  </div>
  <div class="p-4">
    <CypressLockUp variant="color-dark" />
  </div>
  <div class="bg-gray-1000 p-4 rounded">
    <CypressLockUp variant="color-white" />
  </div>
</div>
```
