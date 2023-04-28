<script lang="ts" setup>
import Tooltip from '@cypress-design/vue-tooltip'
</script>

# Tooltip

<DemoWrapper>
	<Tooltip tabIndex="0" class="inline-block">
		<span>Focus me</span>
		<template #popper>Extra information</template>
	</Tooltip>
</DemoWrapper>

Use the tooltip component to display a message when the user hovers over an element.
For accessibility, it also triggers on focus.

[figma::Tooltip](https://www.figma.com/file/1WJ3GVQyMV5e7xVxPg3yID/Design-System%2C-v1.x---%40latest?node-id=12423-23450&t=Q3qySwk0qxyTEsyw-4)
