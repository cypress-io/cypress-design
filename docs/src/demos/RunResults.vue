<script lang="ts" setup>
import RunResults from '@cypress-design/vue-runresults'

const RUN_STATUSES = [
  'passed',
  'failed',
  'running',
  'cancelled',
  'errored',
  'timedOut',
  'noTests',
  'overLimit',
] as const
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
      <h3 class="text-sm font-medium text-gray-500 mb-2">Linked stats</h3>
      <RunResults
        :run-status="{
          buildNumber: 468,
          status: 'passed',
          variant: 'link',
          href: '#run',
        }"
        :passed="22"
        :failed="4"
        :skipped="0"
        :pending="1"
        :flaky="3"
        :self-healed="2"
        show-self-healed
        :links="{
          passed: '#passed',
          failed: '#failed',
          pending: '#pending',
          flaky: '#flaky',
          selfHealed: '#self-healed',
        }"
      />
    </section>

    <section>
      <h3 class="text-sm font-medium text-gray-500 mb-1">
        Run-status pill variants
      </h3>
      <p class="text-base !leading-5 text-gray-700 mb-2">
        Base (left) — no border. Link (right) — status-colored border on hover.
      </p>
      <div class="flex flex-col gap-2">
        <div
          v-for="status in RUN_STATUSES"
          :key="`pair-${status}`"
          class="flex items-center gap-3"
        >
          <RunResults
            :run-status="{ buildNumber: 468, status, variant: 'base' }"
          />
          <RunResults
            :run-status="{
              buildNumber: 468,
              status,
              variant: 'link',
              href: '#run',
            }"
          />
        </div>
      </div>
    </section>

    <section>
      <h3 class="text-sm font-medium text-gray-500 mb-2">
        Run-status pill — with branch segment
      </h3>
      <div class="flex flex-col gap-2">
        <RunResults
          :run-status="{
            buildNumber: 468,
            status: 'running',
            branch: 'develop',
            variant: 'base',
          }"
        />
        <RunResults
          :run-status="{
            buildNumber: 468,
            status: 'passed',
            branch: 'develop',
            variant: 'link',
            href: '#run',
          }"
        />
        <RunResults
          :run-status="{
            buildNumber: 468,
            status: 'failed',
            branch: 'release/2026.07.01-emergency-hotfix-mobile-only',
            variant: 'link',
            href: '#run',
          }"
        />
      </div>
    </section>

    <section class="bg-gray-900 p-4 rounded">
      <h3 class="text-sm font-medium text-gray-300 mb-2">Dark theme</h3>
      <div class="flex flex-col gap-3">
        <div>
          <h4 class="text-xs font-medium text-gray-400 mb-1">Default</h4>
          <RunResults
            :passed="22"
            :failed="4"
            :skipped="0"
            :pending="1"
            theme="dark"
          />
        </div>
        <div>
          <h4 class="text-xs font-medium text-gray-400 mb-1">
            Expanded (zeros shown)
          </h4>
          <RunResults
            :passed="22"
            :failed="4"
            :skipped="0"
            :pending="0"
            expanded
            theme="dark"
          />
        </div>
        <div>
          <h4 class="text-xs font-medium text-gray-400 mb-1">Linked stats</h4>
          <RunResults
            :run-status="{
              buildNumber: 468,
              status: 'passed',
              variant: 'link',
              href: '#run',
            }"
            :passed="22"
            :failed="4"
            :skipped="0"
            :pending="1"
            :flaky="3"
            :self-healed="2"
            show-self-healed
            :links="{
              passed: '#passed',
              failed: '#failed',
              pending: '#pending',
              flaky: '#flaky',
              selfHealed: '#self-healed',
            }"
            theme="dark"
          />
        </div>
        <div>
          <h4 class="text-xs font-medium text-gray-400">
            Run-status pill variants
          </h4>
          <p class="text-base !leading-5 text-gray-300 mb-1">
            Base (left) — no border. Link (right) — status-colored border on
            hover.
          </p>
          <div class="flex flex-col gap-2">
            <div
              v-for="status in RUN_STATUSES"
              :key="`dark-pair-${status}`"
              class="flex items-center gap-3"
            >
              <RunResults
                :run-status="{ buildNumber: 468, status, variant: 'base' }"
                theme="dark"
              />
              <RunResults
                :run-status="{
                  buildNumber: 468,
                  status,
                  variant: 'link',
                  href: '#run',
                }"
                theme="dark"
              />
            </div>
          </div>
        </div>
        <div>
          <h4 class="text-xs font-medium text-gray-400 mb-1">
            Run-status pill — with branch segment
          </h4>
          <div class="flex flex-col gap-2">
            <RunResults
              :run-status="{
                buildNumber: 468,
                status: 'running',
                branch: 'develop',
                variant: 'base',
              }"
              theme="dark"
            />
            <RunResults
              :run-status="{
                buildNumber: 468,
                status: 'passed',
                branch: 'develop',
                variant: 'link',
                href: '#run',
              }"
              theme="dark"
            />
            <RunResults
              :run-status="{
                buildNumber: 468,
                status: 'failed',
                branch: 'release/2026.07.01-emergency-hotfix-mobile-only',
                variant: 'link',
                href: '#run',
              }"
              theme="dark"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
