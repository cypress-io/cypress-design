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
  StaticInputClasses,
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

// tbd: what is a better way of allowing the <input/>
//  to propagate its focus state to siblings?
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
  onReset,
  onChange,
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
        // unclear how to prevent the native [X] from showing
        //  with tailwind, so only using "text" for now:
        type="text" // tbd: support "search"
        value={value}
        disabled={finalIsDisabled}
        onChange={onChange}
        placeholder={placeholder}
        className={StaticInputClasses}
        {...propagateFocusProps}
      />
      {onReset && (
        <button type="button" className={ResetStaticClasses} onClick={onReset}>
          <IconActionDeleteLarge strokeColor={iconStrokeColor} />
        </button>
      )}
      {searchResults && (
        <p className={ResultStaticClass}>
          {searchResults.match} of {searchResults.total} {searchResults.entity}
        </p>
      )}
    </div>
  )
}

export default Input
