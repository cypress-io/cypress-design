import { useState } from 'react'
import Textbox from '@cypress-design/react-textbox'

export default function Default() {
  const [value, setValue] = useState('')
  return (
    <Textbox
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      placeholder="Default placeholder"
    />
  )
}
