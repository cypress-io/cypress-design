<script lang="ts" setup>
import {
  classes,
  type TestResultData,
} from '@cypress-design/constants-testresult'
import { SolidStatusIcon } from '@cypress-design/vue-statusicon'
import {
  IconChevronRightSmall,
  IconStatusFlaky,
  IconDocumentModifiedSquareDot,
  IconDocumentAddedSquarePlus,
} from '@cypress-design/vue-icon'

defineProps<TestResultData & { status: 'passed' | TestResultData['status'] }>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <div
    data-cy="cd-tr-container"
    :class="classes.container"
    @click="(e) => emit('click', e)"
  >
    <div data-cy="cd-tr-row" :class="classes.row">
      <div data-cy="cd-tr-list" :class="classes.list">
        <div data-cy="cd-tr-icon" :class="classes.icon">
          <SolidStatusIcon
            size="16"
            :status="status"
            :class="classes.status_icon"
          />
        </div>
        <div
          data-cy="cd-tr-name-container-column"
          :class="classes.name.container.column"
        >
          <div
            v-if="names.slice(0, -1).length > 0"
            data-cy="cd-tr-name-container-describes"
            :class="classes.name.container.describes"
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
                v-if="index < names.length - 1"
                data-cy="cd-tr-chevron"
                :class="classes.chevron.container"
              >
                <IconChevronRightSmall
                  stroke-color="gray-200"
                  class="mt-[2px]"
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
              v-if="flaky || modified || added"
              data-cy="cd-tr-attributes"
              :class="classes.attribute.container"
            >
              <IconStatusFlaky v-if="flaky" data-cy="cd-tr-flaky" />
              <IconDocumentModifiedSquareDot
                v-if="modified"
                data-cy="cd-tr-modified"
              />
              <IconDocumentAddedSquarePlus v-if="added" data-cy="cd-tr-added" />
            </div>
          </div>
        </div>
        <div
          v-if="$slots.actions"
          data-cy="cd-tr-actions"
          :class="classes.button.container"
        >
          <slot name="actions" />
        </div>
      </div>
      <div
        v-if="$slots.groups?.() !== undefined"
        data-cy="cd-tr-group-container"
        :class="classes.group.container"
      >
        <slot name="groups" />
      </div>
    </div>
  </div>
</template>
