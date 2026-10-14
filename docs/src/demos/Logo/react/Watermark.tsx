import { CypressWatermark } from '@cypress-design/react-logo'

// A faded mark for backgrounds; `dark` switches to the gray tint for light surfaces.
export default function Watermark() {
  return (
    <div className="flex items-center gap-8">
      <div className="rounded bg-gray-1000 p-4">
        <CypressWatermark className="h-[48px] w-[48px]" dark={false} />
      </div>
      <CypressWatermark className="h-[48px] w-[48px]" dark />
    </div>
  )
}
