<script lang="ts" setup>
	import SpecListTestItem from '@cypress-design/vue-speclisttestitem'
	let testNames = ['Describe', 'this', 'for', 'me']
</script>

# SpecListTestItem

<DemoWrapper>
	<SpecListTestItem :names=testNames />
	<SpecListTestItem :names=testNames />
	<SpecListTestItem :names=testNames />
	<SpecListTestItem :names=testNames />
	<SpecListTestItem :names=testNames />
</DemoWrapper>
