import Textbox from '@cypress-design/react-textbox'

export default function Sizes() {
  return (
    <div className="flex flex-col gap-4">
      <Textbox size="32" defaultValue="Size 32" />
      <Textbox size="40" defaultValue="Size 40" />
      <Textbox size="48" defaultValue="Size 48" />
    </div>
  )
}
