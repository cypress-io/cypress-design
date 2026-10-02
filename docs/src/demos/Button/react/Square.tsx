import Button from '@cypress-design/react-button'
import { IconActionQuestionMarkCircle } from '@cypress-design/react-icon'

const sizes = ['20', '24', '32', '40', '48'] as const

export default function Square() {
  return (
    <div className="flex items-center gap-4">
      {/* `square` gives icon-only buttons equal width and height. */}
      {sizes.map((size) => (
        <Button key={size} size={size} square>
          <IconActionQuestionMarkCircle
            fillColor="indigo-400"
            style={{
              width: `${Number(size) / 2}px`,
              height: `${Number(size) / 2}px`,
            }}
          />
        </Button>
      ))}
    </div>
  )
}
