<template>
  <div data-cy="test-result-container" :class="CSS.container">
    <div data-cy="test-result-row" :class="CSS.row">
      <div data-cy="test-result-list" :class="CSS.list">
        <div data-cy="test-result-icon" :class="CSS.icon">
          <StatusIcon
            size="16"
            variant="solid"
            :status="status"
            :class="CSS.status_icon"
          />
        </div>
        <div data-cy="test-result-name-list" :class="CSS.name.list">
          <template v-for="(name, index) in names" :key="index">
            <div
              data-cy="test-result-name-item"
              :class="{
                [CSS.name.item.base]: true,
                [CSS.name.item.first]: names.length >= 2 && index === 0,
                [CSS.name.item.middle]:
                  names.length >= 2 && index > 0 && index < names.length - 1,
                [CSS.name.item.last]: index === names.length - 1,
              }"
            >
              <span
                data-cy="test-result-name-item-text"
                :class="{
                  [CSS.name.item.text.base]: true,
                  [CSS.name.item.text.last]: index === names.length - 1,
                }"
                >{{ name }}</span
              >
              <div
                data-cy="test-result-attributes"
                :class="CSS.attribute.container"
                v-if="index === names.length - 1"
              >
                <IconStatusFlaky data-cy="test-result-flaky" v-if="flaky" />
                <IconDocumentModifiedSquareDot
                  data-cy="test-result-modified"
                  v-if="modified"
                />
                <IconDocumentAddedSquarePlus
                  data-cy="test-result-added"
                  v-if="added"
                />
              </div>
            </div>
            <div
              data-cy="test-result-chevron"
              :class="CSS.chevron.container"
              v-if="index < names.length - 1"
            >
              <IconChevronRightSmall
                stroke-color="gray-200"
                class="align-top relative bottom-[-1px]"
              />
            </div>
          </template>
        </div>
        <div data-cy="test-result-actions" :class="CSS.button.container">
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

          <Button variant="outline-light" size="32" :class="CSS.button.chevron">
            <IconChevronRightSmall stroke-color="gray-500" v-if="!hasGroups" />
            <IconChevronDownSmall stroke-color="gray-500" v-if="hasGroups" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CSS } from '@cypress-design/constants-testresult'
import Button from '@cypress-design/vue-button'
import { StatusIcon } from '@cypress-design/vue-statusicon'
import {
  IconChevronDownSmall,
  IconChevronRightSmall,
  IconStatusFlaky,
  IconDocumentModifiedSquareDot,
  IconDocumentAddedSquarePlus,
  IconActionTestReplay,
} from '@cypress-design/vue-icon'

defineProps<{
  status:
    | 'running'
    | 'failing'
    | 'passed'
    | 'failed'
    | 'unclaimed'
    | 'placeholder'
    | 'cancelled'
    | 'noTests'
    | 'errored'
    | 'timedOut'
    | 'overLimit'
    | 'skipped'
    | 'pending'
    | undefined
  flaky?: boolean
  modified?: boolean
  added?: boolean
  hasGroups?: boolean
  names: Array<string>
}>()
</script>
