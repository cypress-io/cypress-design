<script lang="ts" setup>
import { StatusIcon } from '@cypress-design/vue-statusicon'
</script>

# StatusIcon

<DemoWrapper>
	<div class="flex gap-[16px]">
		<StatusIcon status="passed" />
		<StatusIcon status="cancelled" />
		<StatusIcon status="errored" />
		<StatusIcon status="running" />
	</div>
</DemoWrapper>

The status icon component is used to display a status icon.
