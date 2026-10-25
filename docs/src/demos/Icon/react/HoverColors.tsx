import { IconObjectBook } from '@cypress-design/react-icon'

// Prefix a color prop with `hover` or `focus` to change it on interaction.
export default function HoverColors() {
  return (
    <div className="flex items-center gap-2 font-medium text-gray-700">
      <IconObjectBook
        size="24"
        fillColor="indigo-200"
        strokeColor="indigo-600"
        hoverFillColor="jade-200"
        hoverStrokeColor="teal-600"
      />
      Hover the icon
    </div>
  )
}
