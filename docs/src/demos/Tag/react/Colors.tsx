import Tag from '@cypress-design/react-tag'

const colors = [
  'white',
  'gray',
  'gray-dark',
  'jade',
  'teal',
  'indigo',
  'purple',
  'red',
  'orange',
] as const

export default function Colors() {
  return (
    <div className="flex flex-wrap gap-4">
      {colors.map((color) => (
        <Tag key={color} size="24" color={color}>
          {color}
        </Tag>
      ))}
    </div>
  )
}
