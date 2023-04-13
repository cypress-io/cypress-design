<script lang="ts" setup>
import {ref} from 'vue'
import { iconsMetadata } from '@cypress-design/icon-registry'
import Icon from '@cypress-design/vue-icon'
import Button from '@cypress-design/vue-button'
import _ from 'lodash'

const { upperFirst, camelCase } = _

const search = ref('');

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

<ul class="flex justify-center items-center h-[64px]">
  <li>
		<Button variant="link" href="/components/react/icon">React</Button>
	</li>
  <li>
		<Button variant="link" href="/components/vue/icon">Vue</Button>
	</li>
</ul>

<div class="bg-gray-50 dark:bg-gray-800 rounded p-[16px] my-[24px]">
	<input type="search" v-model="search" placeholder="Search Icons" class="border-solid border-2 block mb-[16px] px-[8px] py-[4px] border-gray-200 focus:border-indigo-300 rounded w-full bg-white dark:bg-gray-900"/>
	<div class="bg-white py-[16px] dark:bg-gray-900">
		<template v-for="meta, iconName of iconsMetadata" :key="iconName">
			<div class="mt-[16px] gap-x-[16px] flex items-end" v-if="search.length ? iconName.includes(search) : true" >
				<p class="text-[16px] whitespace-nowrap overflow-hidden w-[250px] text-right">
					{{ iconName }}
					<br/>&lt;Icon{{ upperFirst(camelCase(iconName)) }} /&gt;
				</p>
				<div v-for="size in meta.availableSizes" :key="size" class="flex gap-[8px] items-end">
					<div class="border-l pl-[4px] py-[4px] border-gray-300 min-w-[32px] flex flex-col items-center gap-x-[16px] gap-y-[4px] justify-end min-h-[96px]">
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
		</template>
	</div>
</div>
