import type { NavGroup } from '../constants'
import DocMenu from './DocMenu.vue'

export default ({ groups }: { groups: NavGroup[] }) => {
  return (
    <ul class="pl-[24px]">
      <li>
        {groups.map((group) => (
          <DocMenu group={group} />
        ))}
      </li>
    </ul>
  )
}
