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

Use the alert when you need a banner of some kind.
Examples:

- To give temporary information to the user.
- To attract attention to a specific note on the page.
- To inform the user of a change in the system.

[figma::Alert](https://www.figma.com/design/ZZZ2it1HdjfHNefqxnWs8Q/Component---Alerts--v1.0--latest?node-id=901-2172)
