<script lang="ts" setup>
  const components$ = { }
</script>

# Card

## Usage

There is no card component, only a CSS class

```tsx live
<div class="p-4 bg-white flex flex-wrap gap-4">
  <div class="card h-20 w-32 flex items-center justify-center">hello</div>
  <div class="card h-20 w-32 flex items-center justify-center">goodbye</div>
</div>
```

One can also add more shadow for a marketing card

`shadow-marketing-card`

```tsx live
<div class="p-4 bg-white flex flex-wrap gap-4">
  <div class="card shadow-marketing-card h-20 w-32 flex items-center justify-center">
    hello
  </div>
  <div class="card shadow-marketing-card h-20 w-32 flex items-center justify-center">
    goodbye
  </div>
</div>
```
