import Checkbox from '@cypress-design/react-checkbox'

// `color` sets the checked fill; the checkmark is always white.
// `checked` is the initial state; `onChange` is required in React.
export default function Colors() {
  return (
    <>
      <Checkbox checked color="indigo" label="Indigo" onChange={() => {}} />
      <Checkbox checked color="jade" label="Jade" onChange={() => {}} />
      <Checkbox checked color="red" label="Red" onChange={() => {}} />
    </>
  )
}
