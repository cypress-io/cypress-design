import clsx from 'clsx'
import * as React from 'react'
import Button from './Button'
import { SizeClassesTable, VariantClassesTable } from '../constants'
import type { ButtonSizes, ButtonVariants } from '../constants'

export default ({
  disabled = false,
  href,
  onClick,
}: { disabled?: boolean; href?: string; onClick?: () => void } = {}) => (
  <div className="flex flex-row flex-wrap gap-2 justify-center">
    {(Object.keys(VariantClassesTable) as ButtonVariants[]).map((variant) => {
      return (
        <div
          className={clsx(
            'flex flex-col items-center gap-3 justify-center mt-4 p-2',
            { 'bg-gray-1000 text-white': variant === 'outline-dark' }
          )}
        >
          <h3 className="text-right">{variant}</h3>
          {(Object.keys(SizeClassesTable) as ButtonSizes[])
            .reverse()
            .map((size) => {
              return (
                <div className="flex items-center justify-center">
                  <span
                    className={clsx('text-sm mr-4', {
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
                    onClick={onClick}
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
