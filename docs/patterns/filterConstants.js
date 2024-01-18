// Import your components
import StatusFilterDropdown from './StatusFilterDropdown.vue'
// import FlakyTestsFilterDropdown from './FlakyTestsFilterDropdown.vue';
// import LastModifiedFilterDropdown from './LastModifiedFilterDropdown.vue';
// import SpecFileFilterDropdown from './SpecFileFilterDropdown.vue';
// import RunGroupFilterDropdown from './RunGroupFilterDropdown.vue';
// import BrowserFilterDropdown from './BrowserFilterDropdown.vue';
// import OSFilterDropdown from './OSFilterDropdown.vue';
// import TestingTypeFilterDropdown from './TestingTypeFilterDropdown.vue';

export const allFilterItems = [
  {
    id: 'status',
    label: 'Status',
    loading: false,
    component: StatusFilterDropdown,
  },
  {
    id: 'flakytests',
    label: 'Flaky tests',
    loading: false,
    component: StatusFilterDropdown,
  },
  {
    id: 'lastmodified',
    label: 'Last modified',
    loading: false,
    component: StatusFilterDropdown,
  },
  {
    id: 'specfile',
    label: 'Spec file',
    loading: false,
    component: StatusFilterDropdown,
  },
  {
    id: 'rungroup',
    label: 'Run group',
    loading: false,
    component: StatusFilterDropdown,
  },
  {
    id: 'browser',
    label: 'Browser',
    loading: false,
    component: StatusFilterDropdown,
  },
  {
    id: 'os',
    label: 'OS',
    loading: false,
    component: StatusFilterDropdown,
  },
  {
    id: 'testingtype',
    label: 'Testing type',
    loading: false,
    component: StatusFilterDropdown,
  },
]
