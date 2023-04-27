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

[figma::Alert](https://www.figma.com/file/1WJ3GVQyMV5e7xVxPg3yID/Design-System%2C-v1.x---%40latest?type=design&node-id=1035-9923&t=31Ux0Tiv1c3LsT2Q-11)
