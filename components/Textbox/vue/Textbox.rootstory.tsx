import * as React from 'react'
import Textbox from './Textbox.vue'
import { CssSizeClassesTable } from '../constants'
import type { TextboxSizes, TextboxVariants } from '../constants'

const variants: TextboxVariants[] = [
  'default',
  'valid',
  'invalid',
  'warning',
  'disabled',
]

export default () => {
  return (
    <div class="p-[80px] flex flex-col gap-[40px] bg-white">
      {/* Textbox Variants */}
      <div class="flex flex-col gap-[16px]">
        <div class="flex flex-col">
          <h2 class="text-[20px] leading-[28px] font-medium text-gray-900">
            Variants
          </h2>
          <p class="text-[18px] leading-[28px] text-gray-700">
            Each variant is a component variant.
          </p>
        </div>
        <div class="flex gap-[40px]">
          {/* Light Mode */}
          <div class="flex flex-col gap-[16px]">
            <h3 class="text-[16px] leading-[24px] font-medium text-gray-900">
              Light Mode
            </h3>
            <div class="flex flex-col gap-[20px] w-[360px]">
              {variants.map((variant) => {
                const stateName =
                  variant.charAt(0).toUpperCase() + variant.slice(1)
                return (
                  <div key={variant} class="flex flex-col gap-[8px]">
                    <label class="text-[14px] leading-[20px] font-medium text-gray-600">
                      {stateName}
                    </label>
                    <Textbox
                      variant={variant}
                      size="40"
                      rounded={false}
                      darkMode={false}
                      disabled={variant === 'disabled'}
                      placeholder="Placeholder"
                      modelValue={stateName}
                      iconLeft="general-placeholder"
                    />
                  </div>
                )
              })}
            </div>
          </div>
          {/* Dark Mode */}
          <div class="flex flex-col gap-[16px] bg-gray-1000 p-[20px] rounded-[8px]">
            <h3 class="text-[16px] leading-[24px] font-medium text-white">
              Dark Mode
            </h3>
            <div class="flex flex-col gap-[20px] w-[360px]">
              {variants.map((variant) => {
                const stateName =
                  variant.charAt(0).toUpperCase() + variant.slice(1)
                return (
                  <div key={variant} class="flex flex-col gap-[8px]">
                    <label class="text-[14px] leading-[20px] font-medium text-gray-400">
                      {stateName}
                    </label>
                    <Textbox
                      variant={variant}
                      size="40"
                      rounded={false}
                      darkMode={true}
                      disabled={variant === 'disabled'}
                      placeholder="Placeholder"
                      modelValue={stateName}
                      iconLeft="general-placeholder"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Textbox Size */}
      <div class="flex flex-col gap-[16px]">
        <div class="flex flex-col">
          <h2 class="text-[20px] leading-[28px] font-medium text-gray-900">
            Sizes
          </h2>
          <p class="text-[18px] leading-[28px] text-gray-700">
            Size is applied with the "Input / Textbox / Size" option in the
            appearance panel.
          </p>
        </div>
        <div class="flex gap-[40px]">
          {/* Light Mode */}
          <div class="flex flex-col gap-[16px]">
            <h3 class="text-[16px] leading-[24px] font-medium text-gray-900">
              Light Mode
            </h3>
            <div class="flex flex-col gap-[20px] w-[360px]">
              {(Object.keys(CssSizeClassesTable) as TextboxSizes[]).map(
                (size) => (
                  <div key={size}>
                    <Textbox
                      variant="default"
                      size={size}
                      rounded={false}
                      darkMode={false}
                      modelValue={size}
                      iconLeft="general-placeholder"
                    />
                  </div>
                ),
              )}
            </div>
          </div>
          {/* Dark Mode */}
          <div class="flex flex-col gap-[16px] bg-gray-1000 p-[20px] rounded-[8px]">
            <h3 class="text-[16px] leading-[24px] font-medium text-white">
              Dark Mode
            </h3>
            <div class="flex flex-col gap-[20px] w-[360px]">
              {(Object.keys(CssSizeClassesTable) as TextboxSizes[]).map(
                (size) => (
                  <div key={size}>
                    <Textbox
                      variant="default"
                      size={size}
                      rounded={false}
                      darkMode={true}
                      modelValue={size}
                      iconLeft="general-placeholder"
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rounded Corners */}
      <div class="flex flex-col gap-[16px]">
        <div class="flex flex-col">
          <h2 class="text-[20px] leading-[28px] font-medium text-gray-900">
            Rounded
          </h2>
          <p class="text-[18px] leading-[28px] text-gray-700">
            Rounded corners are applied with the "Input / Textbox / Rounded"
            option in the appearance panel.
          </p>
        </div>
        <div class="flex gap-[40px]">
          {/* Light Mode */}
          <div class="flex flex-col gap-[16px]">
            <h3 class="text-[16px] leading-[24px] font-medium text-gray-900">
              Light Mode
            </h3>
            <div class="flex flex-col gap-[20px] w-[360px]">
              <div>
                <Textbox
                  variant="default"
                  size="40"
                  rounded={false}
                  darkMode={false}
                  modelValue="Rounded: False"
                  iconLeft="general-placeholder"
                />
              </div>
              <div>
                <Textbox
                  variant="default"
                  size="40"
                  rounded={true}
                  darkMode={false}
                  modelValue="Rounded: True"
                  iconLeft="general-placeholder"
                />
              </div>
            </div>
          </div>
          {/* Dark Mode */}
          <div class="flex flex-col gap-[16px] bg-gray-1000 p-[20px] rounded-[8px]">
            <h3 class="text-[16px] leading-[24px] font-medium text-white">
              Dark Mode
            </h3>
            <div class="flex flex-col gap-[20px] w-[360px]">
              <div>
                <Textbox
                  variant="default"
                  size="40"
                  rounded={false}
                  darkMode={true}
                  modelValue="Rounded: False"
                  iconLeft="general-placeholder"
                />
              </div>
              <div>
                <Textbox
                  variant="default"
                  size="40"
                  rounded={true}
                  darkMode={true}
                  modelValue="Rounded: True"
                  iconLeft="general-placeholder"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div class="flex flex-col gap-[16px]">
        <div class="flex flex-col">
          <h2 class="text-[20px] leading-[28px] font-medium text-gray-900">
            Labels
          </h2>
          <p class="text-[18px] leading-[28px] text-gray-700">
            Labels and icons on left and right sides.
          </p>
        </div>
        <div class="flex gap-[40px]">
          {/* Light Mode */}
          <div class="flex flex-col gap-[16px]">
            <h3 class="text-[16px] leading-[24px] font-medium text-gray-900">
              Light Mode
            </h3>
            <div class="flex flex-col gap-[20px] w-[360px]">
              {(Object.keys(CssSizeClassesTable) as TextboxSizes[]).map(
                (size) => (
                  <div key={size}>
                    <Textbox
                      variant="default"
                      size={size}
                      rounded={false}
                      darkMode={false}
                      modelValue={size}
                      labelLeft="Left"
                      labelRight="Right"
                      iconLeft="general-placeholder"
                      iconRight="general-placeholder"
                    />
                  </div>
                ),
              )}
            </div>
          </div>
          {/* Dark Mode */}
          <div class="flex flex-col gap-[16px] bg-gray-1000 p-[20px] rounded-[8px]">
            <h3 class="text-[16px] leading-[24px] font-medium text-white">
              Dark Mode
            </h3>
            <div class="flex flex-col gap-[20px] w-[360px]">
              {(Object.keys(CssSizeClassesTable) as TextboxSizes[]).map(
                (size) => (
                  <div key={size}>
                    <Textbox
                      variant="default"
                      size={size}
                      rounded={false}
                      darkMode={true}
                      modelValue={size}
                      labelLeft="Left"
                      labelRight="Right"
                      iconLeft="general-placeholder"
                      iconRight="general-placeholder"
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
