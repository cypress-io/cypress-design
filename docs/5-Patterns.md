<script setup>
import BrandColors from './src/BrandColors.vue'
defineExpose({ order: 4 })
</script>

### Patterns

A collection of techniques which are neither simple variables (`colors.gray[400]`) nor simple components (`<Button />`). A Pattern combines components and uses tokens, layout and other patterns to create a more complex "pattern" or _type of usage_ of the component collection.

- Pattern: Layout — Grid and breakpoints

Cypress design system has configuration available for a grid that can appear at multiple sizes depending on which breakpoints you are within.

Example implementation from Tailwind [columns documentation](https://tailwindcss.com/docs/columns):

```jsx
<div class="gap-8 columns-3 ...">
  <img class="w-full aspect-video ..." src="..." />
  <img class="w-full aspect-square ..." src="..." />
  <!-- ... -->
</div>
```

We can use the Tailwind `columns` system to implement Figma page layouts that are specified with a grid.
