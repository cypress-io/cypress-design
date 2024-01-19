<template>
  <div data-cy="tr-container" :class="CSS.container">
    <div data-cy="tr-row" :class="CSS.row">
      <div data-cy="tr-list" :class="CSS.list">
        <div data-cy="tr-icon" :class="CSS.icon">
          <StatusIcon
            size="16"
            variant="solid"
            :status="status"
            :class="CSS.status_icon"
          />
        </div>
        <div
          data-cy="tr-name-container-column"
          :class="CSS.name.container.column"
        >
          <div
            data-cy="tr-name-container-describes"
            :class="CSS.name.container.describes"
            v-if="names.slice(0, -1).length > 0"
          >
            <template v-for="(name, index) in names.slice(0, -1)" :key="index">
              <div
                data-cy="tr-name-item"
                :class="{
                  [CSS.name.item.base]: true,
                  [CSS.name.item.first]: names.length >= 2 && index === 0,
                  [CSS.name.item.middle]:
                    names.length >= 2 && index > 0 && index < names.length - 1,
                }"
              >
                <span
                  data-cy="tr-name-item-text"
                  :class="CSS.name.item.text.base"
                  >{{ name }}</span
                >
              </div>
              <div
                data-cy="tr-chevron"
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
          <div data-cy="tr-name-container-it" :class="CSS.name.container.it">
            <span
              data-cy="tr-name-item-text"
              :class="[CSS.name.item.text.base, CSS.name.item.text.it]"
            >
              {{ names.at(-1) }}
            </span>
            <div
              data-cy="tr-attributes"
              :class="CSS.attribute.container"
              v-if="flaky || modified || added"
            >
              <IconStatusFlaky data-cy="tr-flaky" v-if="flaky" />
              <IconDocumentModifiedSquareDot
                data-cy="tr-modified"
                v-if="modified"
              />
              <IconDocumentAddedSquarePlus data-cy="tr-added" v-if="added" />
            </div>
          </div>
        </div>
        <div data-cy="tr-actions" :class="CSS.button.container">
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
