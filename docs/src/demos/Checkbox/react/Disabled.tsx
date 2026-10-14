import Checkbox from '@cypress-design/react-checkbox'

// `onChange` is required in React, even on a disabled checkbox.
export default function Disabled() {
  return (
    <>
      <Checkbox disabled label="Option #1" name="example" onChange={() => {}} />
      <Checkbox
        disabled
        checked
        label="Option #2"
        name="example"
        onChange={() => {}}
      />
    </>
  )
}
