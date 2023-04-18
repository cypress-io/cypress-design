<script setup>
import BrandColors from './src/BrandColors.vue'
defineExpose({ order: 4 })
</script>

### Patterns

A collection of techniques which are neither simple variables (`colors.gray[400]`) nor simple components (`<Button />`). A Pattern combines components and uses tokens, layout and other patterns to create a more complex "pattern" or _type of usage_ of the component collection.

- Pattern: Layout — Grid and breakpoints

Cypress design system has configuration available for a grid that can appear at multiple sizes depending on which breakpoints you are within.

<!-- How do we share grid styles?  -->
<!-- Are we tailwind compatible? -->
<!-- Cloud uses Bootstrap, should we convert? -->
<!-- The grid is a 12 column grid, and the breakpoints are defined in the `breakpoints` token. -->
