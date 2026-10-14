import Textbox from '@cypress-design/react-textbox'
import { IconShapeLightningBolt } from '@cypress-design/react-icon'

// The divider only renders when there is a left icon to separate.
export default function IconsLabelsDivider() {
  return (
    <Textbox
      labelLeft="Label left"
      labelRight="Label right"
      iconLeft={IconShapeLightningBolt}
      iconRight={IconShapeLightningBolt}
      divider
      defaultValue="Size 40"
    />
  )
}
