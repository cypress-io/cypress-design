<template>
  <div data-cy="cd-tr-container" :class="cyCSS.container">
    <div data-cy="cd-tr-row" :class="cyCSS.row">
      <div data-cy="cd-tr-list" :class="cyCSS.list">
        <div data-cy="cd-tr-icon" :class="cyCSS.icon">
          <StatusIcon
            size="16"
            variant="solid"
            :status="status"
            :class="cyCSS.status_icon"
          />
        </div>
        <div
          data-cy="cd-tr-name-container-column"
          :class="cyCSS.name.container.column"
        >
          <div
            data-cy="cd-tr-name-container-describes"
            :class="cyCSS.name.container.describes"
            v-if="names.slice(0, -1).length > 0"
          >
            <template v-for="(name, index) in names.slice(0, -1)" :key="index">
              <div
                data-cy="cd-tr-name-item"
                :class="{
                  [cyCSS.name.item.base]: true,
                  [cyCSS.name.item.first]: names.length >= 2 && index === 0,
                  [cyCSS.name.item.middle]:
                    names.length >= 2 && index > 0 && index < names.length - 1,
                }"
              >
                <span
                  data-cy="cd-tr-name-item-text"
                  :class="cyCSS.name.item.text.base"
                  >{{ name }}</span
                >
              </div>
              <div
                data-cy="cd-tr-chevron"
                :class="cyCSS.chevron.container"
                v-if="index < names.length - 1"
              >
                <IconChevronRightSmall
                  stroke-color="gray-200"
                  class="align-top relative bottom-[-1px]"
                />
              </div>
            </template>
          </div>
          <div
            data-cy="cd-tr-name-container-it"
            :class="cyCSS.name.container.it"
          >
            <span
              data-cy="cd-tr-name-item-text"
              :class="[cyCSS.name.item.text.base, cyCSS.name.item.text.it]"
            >
              {{ names.at(-1) }}
            </span>
            <div
              data-cy="cd-tr-attributes"
              :class="cyCSS.attribute.container"
              v-if="flaky || modified || added"
            >
              <IconStatusFlaky data-cy="cd-tr-flaky" v-if="flaky" />
              <IconDocumentModifiedSquareDot
                data-cy="cd-tr-modified"
                v-if="modified"
              />
              <IconDocumentAddedSquarePlus data-cy="cd-tr-added" v-if="added" />
            </div>
          </div>
        </div>
        <div data-cy="cd-tr-actions" :class="cyCSS.button.container">
          <slot></slot>
          <Button
            variant="outline-light"
            size="32"
            :class="cyCSS.button.chevron"
          >
            <IconChevronRightSmall stroke-color="gray-500" v-if="!hasGroups" />
            <IconChevronDownSmall stroke-color="gray-500" v-if="hasGroups" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from '@cypress-design/vue-button'
import { CSS as cyCSS } from '@cypress-design/constants-testresult'
import { StatusIcon } from '@cypress-design/vue-statusicon'
import {
  IconChevronDownSmall,
  IconChevronRightSmall,
  IconStatusFlaky,
  IconDocumentModifiedSquareDot,
  IconDocumentAddedSquarePlus,
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
