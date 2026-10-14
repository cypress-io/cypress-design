import Textbox from '@cypress-design/react-textbox'

export default function Variants() {
  return (
    <div className="flex flex-col gap-4">
      <Textbox variant="default" placeholder="Default placeholder" />
      <Textbox variant="valid" placeholder="Valid placeholder" />
      <Textbox variant="invalid" placeholder="Invalid placeholder" />
      <Textbox variant="warning" placeholder="Warning placeholder" />
    </div>
  )
}
