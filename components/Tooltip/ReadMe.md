<script lang="ts" setup>
import Tooltip from '@cypress-design/vue-tooltip'
</script>

# Tooltip

<DemoWrapper>
	<Tooltip tabIndex="0" class="inline-block py-2">
		<span>Focus me / light</span>
		<template #popper>Extra information</template>
	</Tooltip>
	<br/>
	<Tooltip color="dark" tabIndex="0" class="inline-block py-2">
		<span>Focus me / dark</span>
		<template #popper>Extra information</template>
	</Tooltip>
</DemoWrapper>

Use the tooltip component to display a message when the user hovers over an element.
For accessibility, it also opens on keyboard focus and closes on Escape. With `interactive`, Tab moves from the trigger into the tooltip's links, and on to the next control after the last one.

[figma::Tooltip](https://www.figma.com/design/HDdGELnzXrEdg5qgC4SrAz/Component---Tooltips--v1.0--latest?node-id=901-2172)
