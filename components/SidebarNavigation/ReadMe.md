<script lang="ts" setup>
import SidebarNavigation from '@cypress-design/vue-SidebarNavigation'
</script>

# SidebarNavigation

<DemoWrapper>
	<SidebarNavigation :items="[
    {
      text: 'Page',
      href: '#',
    },
    {
      text: 'Overview',
      items: [
        {
          text: 'Overview Item 1',
          href: '#',
          active: true,
        },
        {
          text: 'Overview Item 2',
          href: '#',
        },
      ],
    }]" />
</DemoWrapper>
