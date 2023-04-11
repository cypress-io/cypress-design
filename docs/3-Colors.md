<script setup>
import BrandColors from './src/BrandColors.vue'
defineExpose({ order: 4 })
</script>

# Brand Colors

## Palette

On the following brand palette, there are primary, secondary and tertiary colors.

The **primary colors** are used frequently as the base colors for establishing the brand, and as a result are very commonly used across our products, docs, and marketing.

**Secondary colors** are generally used as accent colors and for semantic purposes throughout the products, docs, and marketing.

The **tertiary colors are reserved for generated content** such as syntax highlighting in code, or charts with large amounts of data points. In general, these colors should only be used when absolutely necessary.

<BrandColors />

## JS variables

If needed, you can import colors by using

`import { colors } from '@cypress-design/css'`

and then use them as e.g. `colors.jade[400]`, `colors.indigo[700]`

CSS is generally prefered over this approach, but this can be useful in situations where using CSS would be irrelevant or overly complicated.

For example, as a prop for a component:

```jsx
<TestTrend commitBranchColor={colors.purple[600]} />
```

or in a JS array or object:

```js
const colorOptions = [
  colors.red[200],
  colors.orange[200],
  colors.jade[100],
  colors.indigo[200],
  colors.purple[200],
  colors.gray[200],
]
```

or in tests:

```js
cy.get('.cy-icon-button').should('have.color', colors.gray[400])

cy.getCy('current-usage').should('have.attr', 'stroke', colors.red[500])
```

## Windi/Tailwind

Design system components use Tailwind & Windi.

Example usage:

<div className="text-white bg-jade-400">background of jade 400</div>
<div className="text-indigo-700">text of indigo 700</div>

```html
<div className="text-white bg-jade-400">background of jade 400</div>
<div className="text-indigo-700">text of indigo 700</div>
```

See also: Tailwind docs for [text color](https://tailwindcss.com/docs/text-color) and [background color](https://tailwindcss.com/docs/background-color).
