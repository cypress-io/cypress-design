<script lang="ts" setup>
import { ref } from 'vue'
import Select from '@cypress-design/vue-select'
import { IconUserGeneralSolid } from '@cypress-design/vue-icon'

const v1 = ref<string | undefined>()
const v2 = ref<string | undefined>('beta')
const v3 = ref<string | undefined>()
const v4 = ref<string | undefined>()
const tab = ref('all')

const simple = [
  { value: 'alpha', label: 'Alpha' },
  { value: 'beta', label: 'Beta' },
  { value: 'gamma', label: 'Gamma' },
]

const grouped = [
  { type: 'headline' as const, label: 'Recent' },
  { value: 'alpha', label: 'Alpha', tag: 'New' },
  { value: 'beta', label: 'Beta' },
  { type: 'divider' as const },
  { type: 'headline' as const, label: 'All' },
  { value: 'gamma', label: 'Gamma' },
  { value: 'delta', label: 'Delta' },
  { value: 'epsilon', label: 'Epsilon', disabled: true },
]

const users = [
  { type: 'user' as const, value: 'u1', label: 'Maya Patel', secondary: 'maya@example.com', iconLeft: IconUserGeneralSolid },
  { type: 'user' as const, value: 'u2', label: 'Jordan Lee', secondary: 'jordan@example.com — Enterprise SSO', iconLeft: IconUserGeneralSolid },
]
</script>

# Select

A single-select dropdown built from cypress-design primitives (Button, Tabs, Checkbox, Textbox, Tag, Icon).

<DemoWrapper>
  <div class="flex gap-6 flex-wrap">
    <Select v-model="v1" :items="simple" placeholder="Pick one" />
    <Select v-model="v2" :items="grouped" placeholder="Pick one" :max-height="280" />
    <Select v-model="v3" :items="users" placeholder="Assignee" :min-width="280" />
    <Select
      v-model="v4"
      :items="grouped"
      placeholder="With header / footer"
      header-title="Pick a value"
      :header-tabs="[{ id: 'all', label: 'All' }, { id: 'mine', label: 'Mine' }]"
      :header-active-tab="tab"
      searchable
      footer-label="Showing 3 of 12"
      :footer-action="{ label: 'Manage', onClick: () => {} }"
      :max-height="320"
      :min-width="280"
      @header-tab-change="(id) => (tab = id)"
    />
  </div>
</DemoWrapper>

[figma::Select light](https://www.figma.com/design/1DRMyEt2idRzHMmV0NTA3O/Component---Inputs-v1.0----latest?node-id=5020-18440)
[figma::Select dark](https://www.figma.com/design/1DRMyEt2idRzHMmV0NTA3O/Component---Inputs-v1.0----latest?node-id=5116-122756)
