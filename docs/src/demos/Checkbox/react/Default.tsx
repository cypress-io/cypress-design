import { useState } from 'react'
import Checkbox from '@cypress-design/react-checkbox'

export default function Default() {
  const [option1, setOption1] = useState(false)
  const [option2, setOption2] = useState(false)
  return (
    <>
      <Checkbox
        checked={option1}
        onChange={(event) => setOption1(event.target.checked)}
        label="Option #1"
        name="example"
      />
      <Checkbox
        checked={option2}
        onChange={(event) => setOption2(event.target.checked)}
        label="Option #2"
        name="example"
      />
    </>
  )
}
