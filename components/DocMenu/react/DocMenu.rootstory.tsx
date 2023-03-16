import * as React from 'react'
import type { NavGroup } from '../constants'
import DocMenu from './DocMenu'

export default ({ groups }: { groups: NavGroup[] }) => {
  return (
    <ul className="pl-[24px]">
      <li>
        {groups.map((group) => (
          <DocMenu group={group} />
        ))}
      </li>
    </ul>
  )
}
