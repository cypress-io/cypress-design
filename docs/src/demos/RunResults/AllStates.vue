<script lang="ts" setup>
import RunResults from '@cypress-design/vue-runresults'
</script>

<template>
  <div class="flex flex-col gap-6">
    <section>
      <h3 class="text-sm font-medium text-gray-500 mb-2">Default</h3>
      <RunResults :passed="22" :failed="4" :skipped="0" :pending="1" />
    </section>

    <section>
      <h3 class="text-sm font-medium text-gray-500 mb-2">
        Expanded (zeros shown)
      </h3>
      <RunResults :passed="22" :failed="4" :skipped="0" :pending="0" expanded />
    </section>

    <section>
      <h3 class="text-sm font-medium text-gray-500 mb-2">With flaky</h3>
      <RunResults
        :passed="22"
        :failed="4"
        :skipped="0"
        :pending="1"
        :flaky="3"
      />
    </section>

    <section>
      <h3 class="text-sm font-medium text-gray-500 mb-2">With self-healed</h3>
      <RunResults
        :passed="22"
        :failed="4"
        :skipped="0"
        :pending="1"
        :self-healed="2"
        show-self-healed
      />
    </section>

    <section>
      <h3 class="text-sm font-medium text-gray-500 mb-2">
        Flaky and self-healed
      </h3>
      <RunResults
        :passed="22"
        :failed="4"
        :skipped="0"
        :pending="1"
        :flaky="3"
        :self-healed="2"
        show-self-healed
      />
    </section>

    <section>
      <h3 class="text-sm font-medium text-gray-500 mb-2">Linked stats</h3>
      <RunResults
        :passed="22"
        :failed="4"
        :skipped="0"
        :pending="1"
        :flaky="3"
        :links="{
          passed: '#passed',
          failed: '#failed',
          pending: '#pending',
          flaky: '#flaky',
        }"
      />
    </section>

    <section class="bg-gray-900 p-4 rounded">
      <h3 class="text-sm font-medium text-gray-300 mb-2">Dark theme</h3>
      <div class="flex flex-col gap-3">
        <div>
          <h4 class="text-xs font-medium text-gray-400 mb-1">
            Default background
          </h4>
          <RunResults
            :passed="22"
            :failed="4"
            :skipped="0"
            :pending="1"
            :flaky="3"
            :links="{
              passed: '#passed',
              failed: '#failed',
              pending: '#pending',
              flaky: '#flaky',
            }"
            theme="dark"
          />
        </div>
        <div>
          <h4 class="text-xs font-medium text-gray-400 mb-1">
            Custom background
          </h4>
          <RunResults
            :passed="22"
            :failed="4"
            :skipped="0"
            :pending="1"
            :flaky="3"
            :links="{
              passed: '#passed',
              failed: '#failed',
              pending: '#pending',
              flaky: '#flaky',
            }"
            theme="dark"
            pill-class-name="bg-gray-900"
          />
        </div>
      </div>
    </section>
  </div>
</template>
