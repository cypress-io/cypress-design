<script lang="ts" setup>
	import TestResult from '@cypress-design/vue-testresult'
	let testNames = ['TestResult', 'should be able to login successfully with proper credentials']
</script>

# TestResult

<DemoWrapper>
	<div class="bg-[#fff] p-[24px]">
		<TestResult status="passed" :names=testNames />
		<TestResult status="failed" :names=testNames />
		<TestResult status="errored" :names=testNames />
		<TestResult status="skipped" :names=testNames />
		<TestResult status="running" :names=testNames />
	</div>
</DemoWrapper>
