import { useState, type ComponentProps, type MouseEvent } from 'react'
import Menu from '@cypress-design/react-menu'
import {
  IconTechnologyServerAlt,
  IconAnimatedTechnologyServer,
  IconGeneralChatBubble,
  IconAnimatedGeneralChatBubble,
  IconTechnologyGitBranches,
  IconAnimatedTechnologyGitBranches,
  IconObjectGear,
  IconAnimatedObjectGear,
} from '@cypress-design/react-icon'

// `icon` is typed for 24px icons only, so wrap icons that also ship a 16px size.
const items: ComponentProps<typeof Menu>['items'] = [
  {
    label: 'Runs',
    icon: (props) => <IconTechnologyServerAlt {...props} />,
    iconActive: IconAnimatedTechnologyServer,
    href: '#runs',
  },
  {
    label: 'Reviews',
    icon: (props) => <IconGeneralChatBubble {...props} />,
    iconActive: IconAnimatedGeneralChatBubble,
    href: '#reviews',
  },
  {
    label: 'Branches',
    icon: (props) => <IconTechnologyGitBranches {...props} />,
    iconActive: IconAnimatedTechnologyGitBranches,
    href: '#branches',
  },
  {
    label: 'Settings',
    icon: (props) => <IconObjectGear {...props} />,
    iconActive: IconAnimatedObjectGear,
    href: '#settings',
  },
]

// The item whose `href` matches `activePath` is highlighted.
export default function Default() {
  const [activePath, setActivePath] = useState('#runs')
  function onMouseDown(e: MouseEvent<HTMLUListElement>) {
    const link = (e.target as HTMLElement).closest('a')
    if (!link) return
    e.preventDefault()
    setActivePath(`#${link.href.split('#')[1]}`)
  }
  return (
    <Menu
      className="w-64"
      activePath={activePath}
      items={items}
      onMouseDown={onMouseDown}
    />
  )
}
