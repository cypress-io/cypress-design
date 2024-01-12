<script lang="ts" setup>
import Menu from '@cypress-design/vue-menu'
</script>

# Menu

<DemoWrapper>
	<Menu 
    activePath="/item1"
    :items="[
      {
        label: 'Page',
        href: '/page',
      },
      {
        label: 'Overview',
        items: [
          {
            label: 'Overview Item 1',
            href: '/item1',
          },
          {
            label: 'Overview Item 2',
            href: '/item2',
          },
        ],
      }]" />
</DemoWrapper>
