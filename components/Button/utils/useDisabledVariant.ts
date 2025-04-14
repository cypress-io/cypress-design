import type { ButtonProps } from '@cypress-design/constants-button'

export function useDisabledVariant(
  variant: ButtonProps['variant'],
  disabled: boolean | undefined,
) {
  const shouldKeepOriginalVariant =
    !disabled ||
    (variant &&
      (variant.includes('dark-mode') ||
        variant.includes('outline') ||
        variant === 'white'))

  return shouldKeepOriginalVariant ? variant || 'disabled' : 'disabled'
}
