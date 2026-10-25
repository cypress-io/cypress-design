import Alert from '@cypress-design/react-alert'

const variants = [
  'info',
  'success',
  'warning',
  'error',
  'neutral',
  'clear',
] as const

export default function Variants() {
  return (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <Alert
          key={variant}
          variant={variant}
          title={
            <>
              This is a <code>{variant}</code> message
            </>
          }
        />
      ))}
    </div>
  )
}
