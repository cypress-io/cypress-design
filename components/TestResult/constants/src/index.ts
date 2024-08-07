import { type statusTypes } from '@cypress-design/constants-statusicon'

export const CssClasses = {
  container:
    'box-border relative hover:z-10 hover:outline outline-[3px] outline-gray-50 transition-all rounded-[1px] mix-blend-darken @container/test-result my-[-1px]',
  row: 'box-border flex flex-col flex-nowrap items-stretch gap-y-[16px] p-[11px] border border-gray-100 hover:border-gray-300 transition-all cursor-pointer justify-start items-center @xl/test-result:px-[15px]',
  list: 'box-border flex justify-start items-center flex-nowrap w-[100%] h-[100%] @xl/test-result:h-[32px] gap-x-[8px]',
  icon: 'box-border h-[16px] w-[16px]',
  status_icon: 'align-top',
  name: {
    container: {
      column:
        'box-border flex flex-nowrap flex-col @xl/test-result:flex-row gap-x-[4px] @xl/test-result:items-center shrink grow h-[100%] overflow-hidden',
      describes:
        'box-border flex flex-nowrap gap-x-[2px] @xl/test-result:gap-x-[4px] items-center overflow-hidden text-ellipsis grow @xl/test-result:grow-0 @xl/test-result:shrink-[2] text-[14px] @xl/test-result:text-[16px] text-gray-700',
      it: 'box-border flex flex-nowrap items-center overflow-hidden grow @xl/test-result:grow-0 @xl/test-result:shrink text-gray-1000 @xl/test-result:text-gray-700',
    },
    item: {
      base: 'box-border @xl/test-result:w-[max-content] min-w-[16px] h-[20px] @xl/test-result:h-[24px] gap-x-[8px] max-w-[max-content]',
      first: 'shrink basis-[max-content]',
      middle: 'shrink-[900000] basis-auto',
      last: 'flex shrink grow basis-[100%] w-[100%] @xl/test-result:shrink @xl/test-result:basis-[max-content]',
      text: {
        base: 'box-border relative inline-block w-[100%] shrink max-w-max whitespace-nowrap overflow-hidden text-ellipsis min-w-[16px] leading-[18px] @xl/test-result:leading-[24px]',
        it: ' @xl/test-result:[direction:rtl] pr-[8px]',
      },
    },
  },
  attribute: {
    container: 'box-border flex items-center grow gap-x-[6px]',
  },
  chevron: {
    container:
      'relative text-gray-300 shrink-0 top-[-3px] @xl/test-result:top-0',
  },
  button: {
    container: 'shrink-0 flex flex-nowrap items-center gap-x-[8px] justify-end',
  },
  group: {
    container: 'pb-[4px] empty:hidden',
  },
}

export interface TestResultData {
  status: statusTypes
  /**
   * The names of the hierarchy for the test result
   * **[NOTE]** the last item is usually the test name
   */
  names: string[]
  /**
   * will display a flaky icon
   */
  flaky?: boolean
  /**
   * will display a "modified" icon
   */
  modified?: boolean
  /**
   * will display an "added" icon
   */
  added?: boolean
}

export const TestResults: (TestResultData & {
  id: string
  groups?: string[]
})[] = [
  {
    id: 'test-result-1',
    status: 'passed',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult should render one level'],
  },
  {
    id: 'test-result-2',
    status: 'passed',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'should render two levels'],
  },
  {
    id: 'test-result-3',
    status: 'passed',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'should', 'render three levels'],
  },
  {
    id: 'test-result-4',
    status: 'passed',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'should', 'render', 'four levels'],
  },
  {
    id: 'test-result-5',
    status: 'passed',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'should', 'render', 'five', 'levels'],
  },
  {
    id: 'test-result-6',
    status: 'passed',
    flaky: false,
    modified: false,
    added: false,
    names: [
      'TestResult',
      'should',
      'render',
      'six',
      'levels',
      'and truncate the text from the middle when the title gets really really really really really long',
    ],
  },
  {
    id: 'test-result-7',
    status: 'passed',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'StatusIcon', 'should render as passed'],
  },
  {
    id: 'test-result-8',
    status: 'failed',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'StatusIcon', 'should render as failed'],
  },
  {
    id: 'test-result-9',
    status: 'errored',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'StatusIcon', 'should render as errored'],
  },
  {
    id: 'test-result-10',
    status: 'skipped',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'StatusIcon', 'should render as skipped'],
  },
  {
    id: 'test-result-11',
    status: 'pending',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'StatusIcon', 'should render as pending'],
  },
  {
    id: 'test-result-12',
    status: 'cancelled',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'StatusIcon', 'should render as cancelled'],
  },
  {
    id: 'test-result-13',
    status: 'unclaimed',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'StatusIcon', 'should render as unclaimed'],
  },
  {
    id: 'test-result-14',
    status: 'placeholder',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'StatusIcon', 'should render as placeholder'],
  },
  {
    id: 'test-result-15',
    status: 'running',
    flaky: false,
    modified: false,
    added: false,
    names: ['TestResult', 'StatusIcon', 'should render as running'],
  },
  {
    id: 'test-result-16',
    status: 'passed',
    flaky: true,
    modified: false,
    added: false,
    names: ['TestResult', 'should render as flaky'],
  },
  {
    id: 'test-result-17',
    status: 'passed',
    flaky: false,
    modified: true,
    added: false,
    names: ['TestResult', 'should render as modified'],
  },
  {
    id: 'test-result-18',
    status: 'passed',
    flaky: false,
    modified: false,
    added: true,
    names: ['TestResult', 'should render as added'],
  },
  {
    id: 'test-result-19',
    status: 'passed',
    flaky: true,
    modified: false,
    added: true,
    names: ['TestResult', 'should render as flaky and added'],
  },
  {
    id: 'test-result-20',
    status: 'passed',
    flaky: true,
    modified: true,
    added: false,
    names: ['TestResult', 'should render as flaky and modified'],
  },
  {
    id: 'test-result-21',
    status: 'passed',
    flaky: true,
    modified: true,
    added: false,
    names: ['TestResult', 'should render with groups'],
    groups: ['Chrome', 'Firefox', 'Safari'],
  },
]
