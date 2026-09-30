import Textbox from '@cypress-design/react-textbox'

export default function DarkTheme() {
  return (
    <div className="flex flex-col gap-4 rounded bg-gray-1000 p-4">
      <Textbox theme="dark" variant="default" placeholder="Default" />
      <Textbox theme="dark" variant="valid" placeholder="Valid" />
      <Textbox theme="dark" variant="invalid" placeholder="Invalid" />
      <Textbox theme="dark" variant="warning" placeholder="Warning" />
      <Textbox theme="dark" disabled defaultValue="Disabled" />
    </div>
  )
}
