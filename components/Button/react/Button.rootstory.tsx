import clsx from 'clsx'
import * as React from 'react'
import Button from './Button'
import { CssSizeClassesTable, CssVariantClassesTable } from '../constants'
import type { ButtonSizes, ButtonVariants } from '../constants'

export default ({
  disabled = false,
  href,
  onClick,
}: { disabled?: boolean; href?: string; onClick?: () => void } = {}) => (
  <div className="flex flex-row flex-wrap justify-center gap-2">
    {(Object.keys(CssVariantClassesTable) as ButtonVariants[]).map(
      (variant) => {
        return (
          <div
            key={variant}
            className={clsx(
              'flex flex-col items-center gap-3 justify-center mt-4 p-2',
              {
                'bg-gray-1000 text-white':
                  variant === 'outline-dark' ||
                  variant === 'outline-red-dark-mode' ||
                  variant === 'red-dark-mode',
              },
            )}
          >
            <h3 className="text-right">{variant}</h3>
            {(Object.keys(CssSizeClassesTable) as ButtonSizes[])
              .reverse()
              .map((size) => {
                return (
                  <div key={size} className="flex items-center justify-center">
                    <span
                      className={clsx('text-sm mr-4', {
                        'text-gray-300':
                          variant === 'outline-dark' ||
                          variant === 'outline-red-dark-mode' ||
                          variant === 'red-dark-mode',
                        'text-gray-700': ![
                          'outline-dark',
                          'outline-red-dark-mode',
                          'red-dark-mode',
                        ].includes(variant),
                      })}
                    >
                      {size}
                    </span>
                    <Button
                      variant={variant}
                      size={size}
                      disabled={disabled}
                      href={href}
                      onClick={onClick}
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
