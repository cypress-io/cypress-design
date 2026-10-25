import Textbox from '@cypress-design/react-textbox'

export default function Rounded() {
  return (
    <div className="flex flex-col gap-4">
      <Textbox rounded={false} defaultValue="Not rounded" />
      <Textbox rounded defaultValue="Rounded" />
    </div>
  )
}
