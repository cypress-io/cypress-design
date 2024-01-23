<template>
  <div
    data-cy="cd-tr-container"
    :class="classes.container"
    @click="(e) => emit('click', e)"
  >
    <div data-cy="cd-tr-row" :class="classes.row">
      <div data-cy="cd-tr-list" :class="classes.list">
        <div data-cy="cd-tr-icon" :class="classes.icon">
          <StatusIcon
            size="16"
            variant="solid"
            :status="status"
            :class="classes.status_icon"
          />
        </div>
        <div
          data-cy="cd-tr-name-container-column"
          :class="classes.name.container.column"
        >
          <div
            data-cy="cd-tr-name-container-describes"
            :class="classes.name.container.describes"
            v-if="names.slice(0, -1).length > 0"
          >
            <template v-for="(name, index) in names.slice(0, -1)" :key="index">
              <div
                data-cy="cd-tr-name-item"
                :class="{
                  [classes.name.item.base]: true,
                  [classes.name.item.first]: names.length >= 2 && index === 0,
                  [classes.name.item.middle]:
                    names.length >= 2 && index > 0 && index < names.length - 1,
                }"
              >
                <span
                  data-cy="cd-tr-name-item-text"
                  :class="classes.name.item.text.base"
                  >{{ name }}</span
                >
              </div>
              <div
                data-cy="cd-tr-chevron"
                :class="classes.chevron.container"
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
            :class="classes.name.container.it"
          >
            <span
              data-cy="cd-tr-name-item-text"
              :class="[classes.name.item.text.base, classes.name.item.text.it]"
            >
              {{ names.at(-1) }}
            </span>
            <div
              data-cy="cd-tr-attributes"
              :class="classes.attribute.container"
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
        <div data-cy="cd-tr-actions" :class="classes.button.container">
          <slot></slot>
          <Button
            variant="outline-light"
            size="32"
            :class="classes.button.chevron"
            @click="(e) => emit('toggle', e)"
          >
            <IconChevronRightSmall
              stroke-color="gray-500"
              class="transition-transform transform"
              :class="{
                'rotate-90': hasGroups,
              }"
            />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from '@cypress-design/vue-button'
import {
  classes,
  type TestResultData,
} from '@cypress-design/constants-testresult'
import { StatusIcon } from '@cypress-design/vue-statusicon'
import {
  IconChevronRightSmall,
  IconStatusFlaky,
  IconDocumentModifiedSquareDot,
  IconDocumentAddedSquarePlus,
} from '@cypress-design/vue-icon'

const emit = defineEmits<{
  /**
   * Emit when the whole line is clicked.
   */
  click: [event: MouseEvent]
  /**
   * Emit when the chevron button is clicked.
   */
  toggle: [event: MouseEvent]
}>()

defineProps<TestResultData>()
</script>
