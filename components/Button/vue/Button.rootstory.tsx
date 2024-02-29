import clsx from 'clsx'
import Button from './Button.vue'
import type { ButtonSizes, ButtonVariants } from '../constants'
import { SizeClassesTable, VariantClassesTable } from '../constants'

export default ({
  disabled = false,
  href,
}: { disabled?: boolean; href?: string } = {}) => (
  <div class="flex flex-row flex-wrap justify-center gap-3">
    {(Object.keys(VariantClassesTable) as ButtonVariants[]).map((variant) => {
      return (
        <div
          class={clsx(
            'flex flex-col items-center gap-3 justify-center mt-4 p-2',
            { 'bg-gray-1000 text-white': variant === 'outline-dark' },
          )}
        >
          <h3 class="text-right">{variant}</h3>
          {(Object.keys(SizeClassesTable) as ButtonSizes[])
            .reverse()
            .map((size) => {
              return (
                <div class="flex items-center justify-center">
                  <span
                    class={clsx('text-sm mr-4', {
                      'text-gray-300': variant === 'outline-dark',
                      'text-gray-700': variant !== 'outline-dark',
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
    })}
  </div>
)
