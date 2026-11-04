import ProgressBar from '@cypress-design/react-progressbar'

const colors = [
  'indigo',
  'indigo-light',
  'purple',
  'teal',
  'jade',
  'red',
  'orange',
  'gray',
] as const

export default function Colors() {
  return (
    <div className="flex flex-col gap-4 rounded bg-white p-4">
      {colors.map((color) => (
        <ProgressBar
          key={color}
          color={color}
          value={60}
          aria-label={`${color} bar`}
        />
      ))}
    </div>
  )
}
