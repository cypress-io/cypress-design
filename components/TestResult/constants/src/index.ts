export const SharedSettings = {
  foo: '-',
  bar: 42,
  baz: false,
}

export const CSS = {
  container:
    'box-border relative my-[-1px] hover:z-10 hover:outline outline-[3px] outline-gray-50 transition-all rounded-[1px] mix-blend-darken @container/test-result',
  row: 'box-border flex border border-gray-100 hover:border-gray-300 transition-all cursor-pointer justify-start items-center flex-nowrap p-[12px] @lg/test-result:px-[16px] @lg/test-result:h-[56px]',
  list: 'box-border flex justify-start items-center flex-nowrap w-[100%] h-[100%] @lg/test-result:h-[32px] gap-x-[8px]',
  icon: 'box-border h-[16px] w-[16px]',
  status_icon: 'align-top',
  name: {
    list: 'box-border flex flex-wrap @lg/test-result:flex-nowrap gap-x-[4px] items-center shrink grow h-[100%] overflow-hidden',
    item: {
      base: 'box-border @lg/test-result:w-[max-content] min-w-[16px] h-[20px] @lg/test-result:h-[24px] gap-x-[8px] text-gray-1000 max-w-[max-content]',
      first:
        'shrink-[2] basis-[max-content] text-[14px] @lg/test-result:text-[16px] text-gray-700 @lg/test-result:text-gray-1000',
      middle:
        'shrink-[900000] basis-auto text-[14px] @lg/test-result:text-[16px] text-gray-700 @lg/test-result:text-gray-1000',
      last: 'flex shrink grow basis-[100%] w-[100%] @lg/test-result:shrink @lg/test-result:basis-[max-content]',
      text: {
        base: 'box-border relative inline-block w-[100%] whitespace-nowrap overflow-hidden text-ellipsis min-w-[16px] leading-[20px] @lg/test-result:leading-[24px]',
        last: '[direction:rtl]',
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
    chevron: '!px-[8px] hidden @lg/test-result:inline-block h-[32px]',
  },
}
