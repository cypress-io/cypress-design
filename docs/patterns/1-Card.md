<script lang="ts" setup>
  const components$ = { }
</script>

# Card

## Usage

There is no card component, only a CSS class

```tsx live
<div class="flex flex-wrap gap-4 bg-white p-4">
  <div class="card flex h-20 w-32 items-center justify-center">hello</div>
  <div class="card flex h-20 w-32 items-center justify-center">goodbye</div>
</div>
```

One can also add more shadow for a marketing card

`shadow-marketing-card`

```tsx live
<div class="flex flex-wrap gap-4 bg-white p-4">
  <div class="card flex h-20 w-32 items-center justify-center shadow-marketing-card">
    hello
  </div>
  <div class="card flex h-20 w-32 items-center justify-center shadow-marketing-card">
    goodbye
  </div>
</div>
```
