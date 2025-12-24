import clsx from 'clsx'
import * as React from 'react'
import Textbox from './Textbox'
import {
  CssSizeClassesTable,
  CssVariantClassesTableLight,
  CssVariantClassesTableDark,
} from '../constants'
import type { TextboxSizes, TextboxVariants } from '../constants'

const variants: TextboxVariants[] = [
  'default',
  'valid',
  'invalid',
  'warning',
  'disabled',
]

export default ({ darkMode = false }: { darkMode?: boolean } = {}) => {
  return (
    <div
      className={clsx(
        'p-[80px] flex flex-col gap-[40px]',
        darkMode ? 'bg-gray-1000' : 'bg-white',
      )}
    >
      {/* Textbox States */}
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col">
          <h2
            className={clsx(
              'text-[20px] leading-[28px] font-medium',
              darkMode ? 'text-white' : 'text-gray-900',
            )}
          >
            Textbox states
          </h2>
          <p
            className={clsx(
              'text-[18px] leading-[28px]',
              darkMode ? 'text-gray-500' : 'text-gray-700',
            )}
          >
            Each state is component variant.
          </p>
        </div>
        <div className="flex flex-col gap-[20px] w-[360px]">
          {variants.map((variant) => {
            const stateName = variant.charAt(0).toUpperCase() + variant.slice(1)
            return (
              <div key={variant} className="flex flex-col gap-[8px]">
                <label
                  className={clsx(
                    'text-[14px] leading-[20px] font-medium',
                    darkMode ? 'text-gray-400' : 'text-gray-600',
                  )}
                >
                  {stateName}
                </label>
                <Textbox
                  variant={variant}
                  size="40"
                  rounded={false}
                  darkMode={darkMode}
                  disabled={variant === 'disabled'}
                  placeholder="Placeholder"
                  value={stateName}
                  iconLeft="general-placeholder"
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Textbox Size */}
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col">
          <h2
            className={clsx(
              'text-[20px] leading-[28px] font-medium',
              darkMode ? 'text-white' : 'text-gray-900',
            )}
          >
            Textbox size
          </h2>
          <p
            className={clsx(
              'text-[18px] leading-[28px]',
              darkMode ? 'text-gray-500' : 'text-gray-700',
            )}
          >
            Size is applied with the "Input / Textbox / Size" option in the
            appearance panel.
          </p>
        </div>
        <div className="flex flex-col gap-[20px] w-[360px]">
          {(Object.keys(CssSizeClassesTable) as TextboxSizes[]).map((size) => (
            <div key={size}>
              <Textbox
                variant="default"
                size={size}
                rounded={false}
                darkMode={darkMode}
                value={size}
                iconLeft="general-placeholder"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Rounded Corners */}
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col">
          <h2
            className={clsx(
              'text-[20px] leading-[28px] font-medium',
              darkMode ? 'text-white' : 'text-gray-900',
            )}
          >
            Rounded corners
          </h2>
          <p
            className={clsx(
              'text-[18px] leading-[28px]',
              darkMode ? 'text-gray-500' : 'text-gray-700',
            )}
          >
            Rounded corners are applied with the "Input / Textbox / Rounded"
            option in the appearance panel.
          </p>
        </div>
        <div className="flex flex-col gap-[20px] w-[360px]">
          <div>
            <Textbox
              variant="default"
              size="40"
              rounded={false}
              darkMode={darkMode}
              value="Rounded: False"
              iconLeft="object-search"
            />
          </div>
          <div>
            <Textbox
              variant="default"
              size="40"
              rounded={true}
              darkMode={darkMode}
              value="Rounded: True"
              iconLeft="object-search"
            />
          </div>
          <div>
            <Textbox
              variant="default"
              size="40"
              rounded={true}
              darkMode={darkMode}
              value="Rounded: True"
              labelLeft="{Label}"
              labelRight="{Label}"
              iconLeft="object-search"
            />
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col">
          <h2
            className={clsx(
              'text-[20px] leading-[28px] font-medium',
              darkMode ? 'text-white' : 'text-gray-900',
            )}
          >
            Options
          </h2>
          <p
            className={clsx(
              'text-[18px] leading-[28px]',
              darkMode ? 'text-gray-500' : 'text-gray-700',
            )}
          >
            <ul className="list-disc ml-6">
              <li>Icon (L)</li>
              <li>Icon (R)</li>
              <li>Label (L)</li>
              <li>Label (R)</li>
              <li>Divider (L)</li>
            </ul>
          </p>
        </div>
        <div className="flex flex-col gap-[20px] w-[360px]">
          {/* Icon Left */}
          <div>
            <Textbox
              variant="default"
              size="40"
              rounded={false}
              darkMode={darkMode}
              value="{Text}"
              iconLeft="object-search"
            />
          </div>
          {/* Icon Right */}
          <div>
            <Textbox
              variant="default"
              size="40"
              rounded={false}
              darkMode={darkMode}
              value="{Text}"
              iconRight="action-close"
            />
          </div>
          {/* Icon Left and Right */}
          <div>
            <Textbox
              variant="default"
              size="40"
              rounded={false}
              darkMode={darkMode}
              value="{Text}"
              iconLeft="object-search"
              iconRight="action-close"
            />
          </div>
          {/* Label Left */}
          <div>
            <Textbox
              variant="default"
              size="40"
              rounded={false}
              darkMode={darkMode}
              value="{Text}"
              labelLeft="{Label}"
            />
          </div>
          {/* Label Right */}
          <div>
            <Textbox
              variant="default"
              size="40"
              rounded={false}
              darkMode={darkMode}
              value="{Text}"
              labelRight="{Label}"
            />
          </div>
          {/* Label Left and Right */}
          <div>
            <Textbox
              variant="default"
              size="40"
              rounded={false}
              darkMode={darkMode}
              value="{Text}"
              labelLeft="{Label}"
              labelRight="{Label}"
            />
          </div>
          {/* All Options Combined */}
          <div>
            <Textbox
              variant="default"
              size="40"
              rounded={false}
              darkMode={darkMode}
              value="{Text}"
              labelLeft="{Label}"
              labelRight="{Label}"
              iconLeft="object-search"
              iconRight="action-close"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
