export const Classes = {
  wrapper: 'relative flex items-center',
  hiddenInput: 'absolute inset-0 w-0 h-0 opacity-0',
  labelTag: 'flex items-center',
  visibleRadio:
    'border border-solid rounded-full h-[16px] w-[16px] flex flex-shrink-0 items-center text-white outline',
  visibleRadioIndicator:
    'rounded-full h-[6px] w-[6px] items-center absolute ml-auto mr-auto inset-x-0',
  trueLabel: 'block ml-[8px] text-[16px] leading-[24px] font-light select-none',
}

export const RadioColors = {
  indigo: 'border-indigo-500 bg-indigo-400',
  jade: 'border-jade-500 bg-jade-400',
  red: 'border-red-500 bg-red-400',
  disabled: 'border-gray-200 bg-gray-100',
  empty: 'border-gray-200 bg-white',
} as const

export interface RadioProps {
  /**
   * A unique identifier for the checkbox on the whole page.
   * It will be used to give match label with input for a11y.
   */
  id?: string
  /**
   * Name attribute of the <input type="radio"/>.
   */
  name?: string
  /**
   * Is the radio checked when it is first rendered.
   */
  checked?: boolean
  /**
   * The color of the background in the checkbox.
   * The check mark will always be white.
   */
  color?: keyof Omit<typeof RadioColors, 'disabled' | 'empty'>
  /**
   * If the radio is disabled, it will not be clickable.
   */
  disabled?: boolean
}
