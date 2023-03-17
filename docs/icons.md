<script lang="ts" setup>
import {ref} from 'vue';
import { iconsMetadata } from '@cypress-design/icon-registry';
import Icon from '@cypress-design/vue-icon';
import Button from '@cypress-design/vue-button';

const colors = ['<default>', 'blue', 'jade', 'red', 'indigo', 'purple', 'gray'];
const strokeColor = ref({label:'teal', value:'teal'});
const fillColor = ref({label:'jade', value:'jade'});
const secondaryStrokeColor = ref({label:'indigo', value:'indigo'});
const secondaryFillColor = ref({label:'indigo', value:'indigo'});
</script>

# Icons

You will find here the list all icons available to cypress developers.
Most of them can be colored using the `strokeColor` and `fillColor` props.

To know what colors you can customize, look for the letters near the icons.

- `s` means strokeColor is available
- `f` means fillColor is available
- `f+` means secondaryFillColor is available
- `s+` means secondaryStrokeColor is available

For more info, check-out the Icon component documentation on the framework you are using.

<ul>
  <li><a href="/components/react/icon">React</a></li>
  <li><a href="/components/vue/icon">Vue</a></li>
</ul>

<div class="bg-gray-50 rounded p-[16px] my-[24px]">
	<div class="bg-white py-[16px]">
		<div class="min-h-[48px] mt-[16px] gap-x-[16px] flex items-end" v-for="meta, iconName of iconsMetadata" :key="iconName">
			<p class="text-[16px] whitespace-nowrap overflow-hidden w-[250px] text-right">{{ iconName }}</p>
			<div v-for="size in meta.availableSizes" :key="size" class="flex gap-[8px]">
				<div class="border-l pl-[4px] py-[4px] border-gray-300 min-w-[32px] flex flex-col items-center gap-x-[16px] gap-y-[4px] justify-end">
					<Icon :name="iconName" :size="size" />
					<p class="text-gray-500 text-[12px]">{{ size }}</p>
				</div>
				<div :key="`${iconName}_${size}`" class="text-center text-teal-500">
					<div v-if="meta.hasStrokeColor && meta.hasStrokeColor.includes(size)">s</div>
					<div v-if="meta.hasFillColor && meta.hasFillColor.includes(size)">f</div>
					<div v-if="meta.hasSecondaryStrokeColor && meta.hasSecondaryStrokeColor.includes(size)">s+</div>
					<div v-if="meta.hasSecondaryFillColor && meta.hasSecondaryFillColor.includes(size)">f+</div>
				</div>
			</div>
		</div>
	</div>
</div>
