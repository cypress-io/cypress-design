import { IconObjectBook } from '@cypress-design/react-icon'

// `interactiveColorsOnGroup` triggers hover colors from the parent `group`.
export default function GroupHover() {
  return (
    <button className="group flex items-center gap-2 font-medium text-indigo-500 hover:text-jade-600">
      <IconObjectBook
        size="24"
        fillColor="indigo-200"
        strokeColor="indigo-600"
        hoverFillColor="jade-200"
        hoverStrokeColor="teal-600"
        interactiveColorsOnGroup
      />
      Hover the button
    </button>
  )
}
