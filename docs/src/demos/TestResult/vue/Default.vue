<script setup lang="ts">
import TestResult from '@cypress-design/vue-testresult'
</script>

<template>
  <div class="bg-white p-4">
    <!-- The last name is the test title; the ones before it are its describe blocks. -->
    <TestResult
      status="passed"
      :names="['TestResult', 'should render two levels']"
    />
  </div>
</template>
