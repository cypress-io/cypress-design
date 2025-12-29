# Textbox

## Install

```bash
npm install @cypress-design/react-textbox @cypress-design/constants-textbox
```

or with yarn

```bash
yarn add @cypress-design/react-textbox @cypress-design/constants-textbox
```

## Usage

```ts
import Textbox from '@cypress-design/react-textbox'
```

```jsx live
import { useState } from 'react'
import Textbox from '@cypress-design/react-textbox'
export default () => {
  const [value, setValue] = useState('Default text')
  return (
    <div className="flex flex-col gap-4 w-[360px]">
      <Textbox placeholder="Enter text..." />
      <Textbox value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  )
}
```

The Textbox component is used to allow the user to enter text input. It supports various variants, sizes, rounded corners, optional labels, and icons.

## Variants

All available textbox variants:

```jsx live
import { useState } from 'react'
import Textbox from '@cypress-design/react-textbox'
import Icon from '@cypress-design/react-icon'

export default () => {
  const variants = [
    'default',
    'valid',
    'invalid',
    'warning',
    'disabled',
  ]

  const [values, setValues] = useState<Record<string, string>>({})

  return (
    <div className="flex flex-col gap-8">
      {/* Light Mode */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] leading-[24px] font-medium text-gray-900">
          Light Mode
        </h3>
        <div className="flex flex-col gap-5 w-[360px]">
          {/* Placeholder variant */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] leading-[20px] font-medium text-gray-600">
              Placeholder
            </label>
            <Textbox
              variant="default"
              size="40"
              rounded={false}
              darkMode={false}
              placeholder="Placeholder"
              iconLeft="general-placeholder"
            />
          </div>

          {/* Other variants */}
          {variants.map((variant) => {
            const stateName = variant.charAt(0).toUpperCase() + variant.slice(1)
            const key = `textbox-${variant}`
            return (
              <div key={variant} className="flex flex-col gap-2">
                <label className="text-[14px] leading-[20px] font-medium text-gray-600">
                  {stateName}
                </label>
                <Textbox
                  variant={variant}
                  size="40"
                  rounded={false}
                  darkMode={false}
                  disabled={variant === 'disabled'}
                  value={values[key] || stateName}
                  onChange={(e) => {
                    if (variant !== 'disabled') {
                      setValues({ ...values, [key]: e.target.value })
                    }
                  }}
                  iconLeft="general-placeholder"
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Dark Mode */}
      <div className="flex flex-col gap-4 bg-gray-1000 p-[20px] rounded-[8px]">
        <h3 className="text-[16px] leading-[24px] font-medium text-white">
          Dark Mode
        </h3>
        <div className="flex flex-col gap-5 w-[360px]">
          {/* Placeholder variant */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] leading-[20px] font-medium text-gray-400">
              Placeholder
            </label>
            <Textbox
              variant="default"
              size="40"
              rounded={false}
              darkMode={true}
              placeholder="Placeholder"
              iconLeft="general-placeholder"
            />
          </div>

          {/* Other variants */}
          {variants.map((variant) => {
            const stateName = variant.charAt(0).toUpperCase() + variant.slice(1)
            const key = `textbox-dark-${variant}`
            return (
              <div key={variant} className="flex flex-col gap-2">
                <label className="text-[14px] leading-[20px] font-medium text-gray-400">
                  {stateName}
                </label>
                <Textbox
                  variant={variant}
                  size="40"
                  rounded={false}
                  darkMode={true}
                  disabled={variant === 'disabled'}
                  value={values[key] || stateName}
                  onChange={(e) => {
                    if (variant !== 'disabled') {
                      setValues({ ...values, [key]: e.target.value })
                    }
                  }}
                  iconLeft="general-placeholder"
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
```

## Sizes

All available textbox sizes:

```jsx live
import { useState } from 'react'
import Textbox from '@cypress-design/react-textbox'

export default () => {
  const sizes = ['32', '40', '48']
  const [values, setValues] = useState<Record<string, string>>({})

  return (
    <div className="flex flex-col gap-8">
      {/* Light Mode */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] leading-[24px] font-medium text-gray-900">
          Light Mode
        </h3>
        <div className="flex flex-col gap-5 w-[360px]">
          {sizes.map((size) => {
            const sizeName = `Size ${size}px`
            const key = `textbox-size-${size}`
            return (
              <div key={size} className="flex flex-col gap-2">
                <label className="text-[14px] leading-[20px] font-medium text-gray-600">
                  {sizeName}
                </label>
                <Textbox
                  size={size}
                  rounded={false}
                  darkMode={false}
                  value={values[key] || sizeName}
                  onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Dark Mode */}
      <div className="flex flex-col gap-4 bg-gray-1000 p-[20px] rounded-[8px]">
        <h3 className="text-[16px] leading-[24px] font-medium text-white">
          Dark Mode
        </h3>
        <div className="flex flex-col gap-5 w-[360px]">
          {sizes.map((size) => {
            const sizeName = `Size ${size}px`
            const key = `textbox-size-dark-${size}`
            return (
              <div key={size} className="flex flex-col gap-2">
                <label className="text-[14px] leading-[20px] font-medium text-gray-400">
                  {sizeName}
                </label>
                <Textbox
                  size={size}
                  rounded={false}
                  darkMode={true}
                  value={values[key] || sizeName}
                  onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
```

## Rounded

Rounded and not rounded variants:

```jsx live
import { useState } from 'react'
import Textbox from '@cypress-design/react-textbox'

export default () => {
  const roundedOptions = [
    { value: false, label: 'Not Rounded' },
    { value: true, label: 'Rounded' },
  ]
  const [values, setValues] = useState<Record<string, string>>({})

  return (
    <div className="flex flex-col gap-8">
      {/* Light Mode */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] leading-[24px] font-medium text-gray-900">
          Light Mode
        </h3>
        <div className="flex flex-col gap-5 w-[360px]">
          {roundedOptions.map((option) => {
            const key = `textbox-rounded-${option.value}`
            return (
              <div key={String(option.value)} className="flex flex-col gap-2">
                <label className="text-[14px] leading-[20px] font-medium text-gray-600">
                  {option.label}
                </label>
                <Textbox
                  rounded={option.value}
                  size="40"
                  darkMode={false}
                  value={values[key] || option.label}
                  onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Dark Mode */}
      <div className="flex flex-col gap-4 bg-gray-1000 p-[20px] rounded-[8px]">
        <h3 className="text-[16px] leading-[24px] font-medium text-white">
          Dark Mode
        </h3>
        <div className="flex flex-col gap-5 w-[360px]">
          {roundedOptions.map((option) => {
            const key = `textbox-rounded-dark-${option.value}`
            return (
              <div key={String(option.value)} className="flex flex-col gap-2">
                <label className="text-[14px] leading-[20px] font-medium text-gray-400">
                  {option.label}
                </label>
                <Textbox
                  rounded={option.value}
                  size="40"
                  darkMode={true}
                  value={values[key] || option.label}
                  onChange={(e) => setValues({ ...values, [key]: e.target.value })}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
```

## Labels

Textboxes with labels and icons:

```jsx live
import { useState } from 'react'
import Textbox from '@cypress-design/react-textbox'
import Icon from '@cypress-design/react-icon'

export default () => {
  const sizes = ['32', '40', '48']
  const [values, setValues] = useState<Record<string, string>>({})

  return (
    <div className="flex flex-col gap-8">
      {/* Light Mode */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] leading-[24px] font-medium text-gray-900">
          Light Mode
        </h3>
        <div className="flex flex-col gap-8 w-[360px]">
          {sizes.map((size) => {
            const keyBase = `textbox-${size}`
            return (
              <div key={size} className="flex flex-col gap-4">
                <h3 className="text-[16px] font-semibold text-gray-900">Size {size}px</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] text-gray-600">Labels and Icons (Left and Right)</label>
                    <Textbox
                      size={size}
                      rounded={false}
                      darkMode={false}
                      labelLeft="Left"
                      labelRight="Right"
                      iconLeft="general-placeholder"
                      iconRight="general-placeholder"
                      value={values[`${keyBase}-all`] || ''}
                      onChange={(e) => setValues({ ...values, [`${keyBase}-all`]: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Dark Mode */}
      <div className="flex flex-col gap-4 bg-gray-1000 p-[20px] rounded-[8px]">
        <h3 className="text-[16px] leading-[24px] font-medium text-white">
          Dark Mode
        </h3>
        <div className="flex flex-col gap-8 w-[360px]">
          {sizes.map((size) => {
            const keyBase = `textbox-dark-${size}`
            return (
              <div key={size} className="flex flex-col gap-4">
                <h3 className="text-[16px] font-semibold text-white">Size {size}px</h3>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] text-gray-400">Labels and Icons (Left and Right)</label>
                    <Textbox
                      size={size}
                      rounded={false}
                      darkMode={true}
                      labelLeft="Left"
                      labelRight="Right"
                      iconLeft="general-placeholder"
                      iconRight="general-placeholder"
                      value={values[`${keyBase}-all`] || ''}
                      onChange={(e) => setValues({ ...values, [`${keyBase}-all`]: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
```

[figma::Textbox](https://www.figma.com/design/1DRMyEt2idRzHMmV0NTA3O/Component---Inputs-v1.0----latest?node-id=911-826&m=dev)
