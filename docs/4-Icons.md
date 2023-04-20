<script lang="ts" setup>
import IconsGrid from './src/IconsGrid.vue'
import Button from '@cypress-design/vue-button'
</script>

# Icons

You will find here the list all icons available to cypress developers.
Most of them can get colors from the `strokeColor` and `fillColor` props.

To know what colors you can customize, look for the letters near the icons.

- `s` means strokeColor is available
- `f` means fillColor is available
- `f+` means secondaryFillColor is available
- `s+` means secondaryStrokeColor is available

For more info, check-out the Icon component documentation on the framework you are using.

<ul class="flex justify-center items-center h-[64px]">
  <li class="list-none">
		<Button variant="link" href="/components/react/Icon.html">React</Button>
	</li>
  <li class="list-none">
		<Button variant="link" href="/components/vue/Icon.html">Vue</Button>
	</li>
</ul>

<IconsGrid />
