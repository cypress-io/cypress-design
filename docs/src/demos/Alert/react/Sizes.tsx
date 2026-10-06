import Alert from '@cypress-design/react-alert'

const sizes = ['xs', 'sm', 'md', 'lg'] as const

export default function Sizes() {
  return (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <Alert
          key={size}
          size={size}
          title={
            <>
              This is a <code>{size}</code> alert
            </>
          }
        />
      ))}
    </div>
  )
}
