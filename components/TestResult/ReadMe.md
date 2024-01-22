<script lang="ts" setup>
  import TestResult from '@cypress-design/vue-testresult'
  import Button from '@cypress-design/vue-button'
  import { TestResults } from '@cypress-design/constants-testresult'
  import { IconActionTestReplay } from '@cypress-design/vue-icon'
</script>

# TestResult

<DemoWrapper>
  <div class="bg-[#fff] p-[16px] max-h-[480px] overflow-hidden overflow-y-auto">
    <template v-for="tr of TestResults">
      <TestResult :status="tr.status" :names=tr.names>
        <Button
          variant="outline-light"
          size="32"
          class="!px-[8px] @lg/test-result:!px-[12px] h-[32px]"
        >
          <IconActionTestReplay />
          <span class="hidden @lg/test-result:inline ml-[8px]">
            Test Replay
          </span>
        </Button>
      </TestResult>
    </template>
  </div>
</DemoWrapper>
