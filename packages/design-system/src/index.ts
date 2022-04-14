/*!
 * Cypress Design System
 */

import 'windi.css'

export * from 'react-bootstrap'

// Replace react-bootstrap's tooltip with rc-tooltip
export { default as Tooltip } from 'rc-tooltip'

export { Avatar } from './components/Avatar'
export { AvatarList } from './components/AvatarList'

export { BetaBadge } from './components/badges/BetaBadge'
export { FlakyBadge } from './components/badges/FlakyBadge'
export { NewBadge } from './components/badges/NewBadge'
export { TestResultModificationTypeBadge } from './components/badges/TestResultModificationTypeBadge'

export { Banner } from './components/Banner'

export { IconButton } from './components/buttons/IconButton'

export { Checkbox } from './components/Checkbox'

export { CollapsingSection } from './components/CollapsingSection'

export {
  ChartEmptyState,
  EmptyState,
  FilterEmptyState,
  TextEmptyState,
  PanelEmptyState,
} from './components/empty-state'

export { FormGroup, FormGroupProps } from './components/FormGroup'

export { HorizontalList } from './components/HorizontalList'

export { CustomIcon } from './components/custom-icons/CustomIcon'
export { Icon } from './components/Icon'
export { StatusIcon, TestResultStatusIcon } from './components/StatusIcon'
export { StatusIconV2 } from './components/StatusIconV2'

export { Label } from './components/Label'

export { LabeledInput } from './components/LabeledInput'

export {
  ContentLoader,
  LoaderChart,
  LoaderGraph,
  LoaderList,
} from './components/loader'

export { MarkDown } from './components/MarkDown'

export { OrgLogo } from './components/OrgLogo'

export { Panel } from './components/Panel'

export { PropertyList } from './components/PropertyList'

export { Radio } from './components/Radio'

export { RunStats } from './components/RunStats'

export { RunStatusDots } from './components/RunStatusDots'

export { SectionHeading } from './components/SectionHeading'

export { Switch } from './components/Switch'

export { Tag } from './components/Tag'

export { CopyText } from './components/CopyText'

// @ts-ignore
export { default as palette } from './styles/exports.scss'

export * from './utils-ts'
