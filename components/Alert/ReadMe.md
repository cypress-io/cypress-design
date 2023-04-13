<script lang="ts" setup>
import Alert from '@cypress-design/vue-alert'
</script>

# Alert

<DemoWrapper>
	<Alert>
		This is an <code>info</code> message
		<template #body>
			<p>This is the body of the alert.</p>
		</template>
	</Alert>
</DemoWrapper>

The alert component is used to display a message to the user. It can be used to display a success, warning or error message.
