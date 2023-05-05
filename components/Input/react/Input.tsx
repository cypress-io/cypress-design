import * as React from 'react'
import clsx from 'clsx'
import {
  InputProps,
  DefaultSize,
  DefaultVariant,
  SizeClassesTable,
  VariantClassesTable,
  IconStaticClasses,
  ResetStaticClasses,
  ResultStaticClass,
  StaticClasses,
  inputClasses,
} from '@cypress-design/constants-input'
import {
  IconObjectMagnifyingGlass,
  IconActionDeleteLarge,
} from '@cypress-design/react-icon'

export interface InputPropsJsx extends InputProps {
  id: string
  value?: string
  className?: string
}

type ReactInputProps = InputPropsJsx & React.HTMLProps<HTMLInputElement>

// tbd: what is a better way of allowing the
//  <input/> to propagate its focus state?
const usePropagateFocusProps = () => {
  const [hasFocus, setHasFocus] = React.useState(false)
  const enableFocusStyle = React.useCallback(() => setHasFocus(true), [])
  const disableFocusStyle = React.useCallback(() => setHasFocus(false), [])
  const propagateFocusProps = React.useMemo(() => {
    return {
      onFocus: enableFocusStyle,
      onMouseEnter: enableFocusStyle,
      onMouseOver: enableFocusStyle,
      onBlur: disableFocusStyle,
      onMouseLeave: disableFocusStyle,
      onMouseOut: disableFocusStyle,
    }
  }, [enableFocusStyle, disableFocusStyle])
  return {
    propagateFocusProps,
    hasFocus,
  }
}

export const Input: React.FC<ReactInputProps> = ({
  id,
  className,
  customIcon,
  isSearch,
  searchResults,
  size = DefaultSize,
  variant = DefaultVariant,
  onChange,
  onReset,
  placeholder,
  disabled,
  value,
  ...rest
}) => {
  const { propagateFocusProps, hasFocus } = usePropagateFocusProps()

  const finalIsDisabled = disabled || variant === 'disabled'
  const finalVariant = finalIsDisabled ? 'disabled' : variant

  const variantClasses = inputClasses[finalVariant] ?? {}

  const iconStrokeColor =
    finalVariant !== 'default'
      ? variantClasses.icon
      : hasFocus
      ? inputClasses.active.icon
      : inputClasses.default.icon

  const Icon = customIcon ?? isSearch ? IconObjectMagnifyingGlass : null

  return (
    <div
      {...rest}
      id={id}
      className={clsx(
        StaticClasses,
        VariantClassesTable[finalVariant],
        SizeClassesTable[size],
        className
      )}
    >
      {Icon && (
        <Icon className={IconStaticClasses} strokeColor={iconStrokeColor} />
      )}
      <input
        type="text"
        value={value}
        disabled={finalIsDisabled}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx('w-[100%]')}
        {...propagateFocusProps}
      />
      {onReset && (
        <button type="button" className={ResetStaticClasses} onClick={onReset}>
          <IconActionDeleteLarge strokeColor={iconStrokeColor} />
        </button>
      )}
      {searchResults && (
        <div className={ResultStaticClass}>
          {searchResults.match} of {searchResults.total} {searchResults.entity}
        </div>
      )}
    </div>
  )
}

export default Input
