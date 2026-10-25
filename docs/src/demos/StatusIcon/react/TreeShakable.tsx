// Import one variant's component so only that variant's icons are bundled.
import { SolidStatusIcon } from '@cypress-design/react-statusicon'

export default function TreeShakable() {
  return <SolidStatusIcon size="16" status="failed" />
}
