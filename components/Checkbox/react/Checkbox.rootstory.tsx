import * as React from 'react'
import Checkbox from './Checkbox'

export default (options: {
  color?: 'jade' | 'indigo' | 'red'
  checked?: boolean
}) => {
  const { checked = true, color } = options
  return (
    <Checkbox
      checked={checked}
      label="Checked"
      color={color}
      onChange={() => {}}
    />
  )
}
