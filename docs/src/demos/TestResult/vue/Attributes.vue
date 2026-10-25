<script setup lang="ts">
import TestResult from '@cypress-design/vue-testresult'
</script>

<template>
  <div class="bg-white p-4">
    <TestResult
      status="passed"
      :names="['TestResult', 'should render as flaky']"
      flaky
    />
    <TestResult
      status="passed"
      :names="['TestResult', 'should render as modified']"
      modified
    />
    <TestResult
      status="passed"
      :names="['TestResult', 'should render as added']"
      added
    />
    <TestResult
      status="passed"
      :names="['TestResult', 'should render as flaky and added']"
      flaky
      added
    />
    <TestResult
      status="passed"
      :names="['TestResult', 'should render as flaky and modified']"
      flaky
      modified
    />
  </div>
</template>
