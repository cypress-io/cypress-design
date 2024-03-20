<script lang="ts" setup>
import { ref } from 'vue'
import Menu from '@cypress-design/vue-menu'
import {
  IconGeneralChatBubble,
  IconAnimatedGeneralChatBubble,
  IconTechnologyServerAlt,
  IconTechnologyGitBranches,
  IconViewPieChart,
  IconAnimatedTechnologyServer,
  IconAnimatedTechnologyGitBranches,
  IconAnimatedViewChart,
  IconObjectGear,
  IconAnimatedObjectGear,
  IconWindowCodeEditor,
} from '@cypress-design/vue-icon'

const activePath = ref('#runs')
</script>

# Menu

<DemoWrapper>
	<Menu
    :activePath="activePath"
    :items="[
      {
        label: 'Runs',
        icon: IconTechnologyServerAlt,
        iconActive: IconAnimatedTechnologyServer,
        href: '#runs',
      },
      {
        label: 'Reviews',
        icon: IconGeneralChatBubble,
        iconActive: IconAnimatedGeneralChatBubble,
        href: '#reviews',
      },
      {
        label: 'Branches',
        icon: IconTechnologyGitBranches,
        iconActive: IconAnimatedTechnologyGitBranches,
        href: '#branches',
      },
      {
        label: 'Insights',
        icon: IconViewPieChart,
        iconActive: IconAnimatedViewChart,
        href: '#insights',
        items: [
          'Run status',
          'Run duration',
          'Test suite size',
          'Top failures',
          'Slowest tests',
          'Most common errors',
          'Flaky tests',
        ].map((l) => ({
          label: l,
          href: `#${l.toLowerCase().replace(/ /g, '-')}`,
        })),
      },
      {
        label: 'Specs',
        icon: IconWindowCodeEditor,
        iconActive: IconWindowCodeEditor,
        href: '#specs',
      },
      {
        label: 'Settings',
        icon: IconObjectGear,
        iconActive: IconAnimatedObjectGear,
        href: '#settings',
      },
    ]"
    @mousedown="
      (e) => {
        // if target is a child of a link, prevent default
        if (e.target.closest('a')) {
          e.preventDefault()
          activePath = `#${e.target.closest('a').href?.split('#')[1]}`
        }
      }
    "
  />
</DemoWrapper>

Navigation menu to use in the Sidebar of the app & cloud.

[figma::Menu](https://www.figma.com/file/8StecHdRdqQwJwjxsK9woR/Cloud-Navigation%2C-v2.0---%40wip?type=design&node-id=503-2275&mode=design&t=friccqnTPIAsAxGg-4)
