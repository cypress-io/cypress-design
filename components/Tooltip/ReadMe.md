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
