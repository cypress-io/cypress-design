export const SharedSettings = {
  foo: '-',
  bar: 42,
  baz: false,
}

export const Classes = {
  wrapper: 'relative flex items-center',
  hiddenInput: 'absolute inset-0 w-0 h-0 opacity-0',
  labelTag: 'flex items-center',
  visibleCheckbox:
    'border border-solid rounded h-[16px] w-[16px] flex flex-shrink-0 items-center text-white',
  trueLabel: 'block ml-[8px] text-[16px] leading-[24px] font-light select-none',
}

export const RadioColors = {
  indigo: 'border-indigo-500 bg-indigo-400',
  jade: 'border-jade-500 bg-jade-400',
  red: 'border-red-500 bg-red-400',
  disabled: 'border-gray-200 bg-gray-100',
  empty: 'border-gray-200 bg-white',
} as const
