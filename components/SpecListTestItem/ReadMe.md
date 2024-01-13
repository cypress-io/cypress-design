<script lang="ts" setup>
	import SpecListTestItem from '@cypress-design/vue-speclisttestitem'
	let testNames = ['Authentication', 'Roles', 'Admin', 'Should be able to login successfully with proper credentials']
</script>

# SpecListTestItem

<DemoWrapper>
	<div class="bg-[#fff] p-[24px]">
		<SpecListTestItem status="passed" :names=testNames />
		<SpecListTestItem status="failed" :names=testNames />
		<SpecListTestItem status="errored" :names=testNames />
		<SpecListTestItem status="skipped" :names=testNames />
		<SpecListTestItem status="running" :names=testNames />
	</div>
</DemoWrapper>
