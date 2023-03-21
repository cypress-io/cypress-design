<script lang="ts" setup>
import { iconsMetadata } from '@cypress-design/icon-registry';
import Icon from '@cypress-design/vue-icon'
</script>

# Icon

<DemoWrapper>
	<div class="grid grid-cols-4 bg-white dark:bg-gray-700 gap-[8px] justify-items-center items-center h-[200px] overflow-auto py-[16px]">
		<div class="h-[48px] text-center flex flex-col items-center justify-end gap-[8px]" v-for="icon, iconName of iconsMetadata" :key="iconName">
			<Icon :name="iconName" />
			<p class="text-[10px] whitespace-nowrap overflow-hidden">{{ iconName }}</p>
		</div>
	</div>
</DemoWrapper>

Icon component is used to display an icon.

## Figma

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## When not to use it

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
