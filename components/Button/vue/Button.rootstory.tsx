import clsx from 'clsx'
import Button from './Button.vue'
import type { ButtonSizes, ButtonVariants } from '../constants'
import { CssSizeClassesTable, CssVariantClassesTable } from '../constants'

const darkModeVariants: ButtonVariants[] = [
  'outline-dark',
  'outline-red-dark-mode',
  'outline-jade-dark-mode',
  'outline-indigo-dark-mode',
  'outline-purple-dark-mode',
  'red-dark-mode',
  'purple-dark-mode',
  'indigo-dark-mode',
  'disabled-dark-mode',
]

export default ({
  disabled = false,
  href,
}: { disabled?: boolean; href?: string } = {}) => (
  <div class="flex flex-row flex-wrap justify-center gap-3">
    {(Object.keys(CssVariantClassesTable) as ButtonVariants[]).map(
      (variant) => {
        return (
          <div
            class={clsx(
              'flex flex-col items-center gap-3 justify-center mt-4 p-2',
              {
                'bg-gray-1000 text-white': darkModeVariants.includes(variant),
              },
            )}
          >
            <h3 class="text-right">{variant}</h3>
            {(Object.keys(CssSizeClassesTable) as ButtonSizes[])
              .reverse()
              .map((size) => {
                return (
                  <div class="flex items-center justify-center">
                    <span
                      class={clsx('text-sm mr-4', {
                        'text-gray-300': darkModeVariants.includes(variant),
                        'text-gray-700': !darkModeVariants.includes(variant),
                      })}
                    >
                      {size}
                    </span>
                    <Button
                      variant={variant}
                      size={size}
                      disabled={disabled}
                      href={href}
                    >
                      Button
                    </Button>
                  </div>
                )
              })}
          </div>
        )
      },
    )}
  </div>
)
