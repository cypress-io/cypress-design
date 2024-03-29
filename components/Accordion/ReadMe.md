<script lang="ts" setup>
import { IconActionQuestionMarkCircle } from '@cypress-design/vue-icon'
import Accordion from '@cypress-design/vue-accordion'
</script>

# Accordion

<DemoWrapper>
	<Accordion
		:icon="IconActionQuestionMarkCircle"
		title="Accordion Title"
		description="Vestibulum id ligula porta felis euismod semper. Nulla... "
		separator
		open
	>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
		</p>
		<p>
			Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
	</Accordion>
</DemoWrapper>

The Accordion component is a container that can be expanded or collapsed by clicking on its header. It is useful to display content which is not immediately relevant to the user.

[figma::Accordion](https://www.figma.com/file/1WJ3GVQyMV5e7xVxPg3yID/Design-System%2C-v1.x---%40latest?node-id=2232-3477&t=Q3qySwk0qxyTEsyw-4)
