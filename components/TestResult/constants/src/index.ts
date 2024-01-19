export const SharedSettings = {
  foo: '-',
  bar: 42,
  baz: false,
}

export const CSS = {
  container:
    'box-border relative my-[-1px] hover:z-10 hover:outline outline-[3px] outline-gray-50 transition-all rounded-[1px] mix-blend-darken @container/test-result',
  row: 'box-border flex border border-gray-100 hover:border-gray-300 transition-all cursor-pointer justify-start items-center flex-nowrap p-[12px] @xl/test-result:px-[16px] @xl/test-result:h-[56px]',
  list: 'box-border flex justify-start items-center flex-nowrap w-[100%] h-[100%] @xl/test-result:h-[32px] gap-x-[8px]',
  icon: 'box-border h-[16px] w-[16px]',
  status_icon: 'align-top',
  name: {
    container: {
      column:
        'box-border flex flex-nowrap flex-col @xl/test-result:flex-row gap-x-[4px] @xl/test-result:items-center shrink grow h-[100%] overflow-hidden',
      describes:
        'box-border flex flex-nowrap gap-x-[4px] items-center overflow-hidden grow @xl/test-result:grow-0 @xl/test-result:shrink-[10]',
      it: 'box-border flex flex-nowrap items-center overflow-hidden grow @xl/test-result:grow-0 @xl/test-result:shrink',
    },
    item: {
      base: 'box-border @xl/test-result:w-[max-content] min-w-[16px] h-[20px] @xl/test-result:h-[24px] gap-x-[8px] text-gray-1000 max-w-[max-content]',
      first:
        'shrink basis-[max-content] text-[14px] @xl/test-result:text-[16px] text-gray-700 @xl/test-result:text-gray-1000',
      middle:
        'shrink-[900000] basis-auto text-[14px] @xl/test-result:text-[16px] text-gray-700 @xl/test-result:text-gray-1000',
      last: 'flex shrink grow basis-[100%] w-[100%] @xl/test-result:shrink @xl/test-result:basis-[max-content]',
      text: {
        base: 'box-border relative inline-block w-[100%] whitespace-nowrap overflow-hidden text-ellipsis min-w-[16px] leading-[20px] @xl/test-result:leading-[24px]',
        it: ' @xl/test-result:[direction:rtl] pr-[8px]',
      },
    },
  },
  attribute: {
    container: 'box-border flex items-center grow gap-x-[6px]',
  },
  chevron: {
    container: 'relative text-gray-300 shrink-0',
  },
  button: {
    container: 'shrink-0 flex flex-nowrap items-center gap-x-[8px] justify-end',
    chevron: '!px-[8px] hidden @xl/test-result:inline-block h-[32px]',
  },
}
