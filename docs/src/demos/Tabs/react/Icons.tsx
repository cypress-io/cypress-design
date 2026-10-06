import Tabs from '@cypress-design/react-tabs'
import {
  IconActionPlayVideo,
  IconActionRecord,
  IconGeneralCrosshairs,
  IconSecurityLockLocked,
} from '@cypress-design/react-icon'

// `icon` renders before the label, `iconAfter` after it.
const tabs = [
  {
    id: 'ov',
    label: 'Overview',
    icon: IconActionPlayVideo,
    ['aria-controls']: 'react-icons-panel-1',
  },
  {
    id: 'cl',
    label: 'Command Log',
    icon: IconActionRecord,
    ['aria-controls']: 'react-icons-panel-2',
  },
  {
    id: 'err',
    label: 'Errors',
    iconAfter: IconSecurityLockLocked,
    tag: '13',
    ['aria-controls']: 'react-icons-panel-3',
  },
  {
    id: 'reco',
    label: 'Recommendations',
    icon: IconGeneralCrosshairs,
    ['aria-controls']: 'react-icons-panel-4',
  },
]

export default function Icons() {
  return <Tabs tabs={tabs} activeId="ov" />
}
