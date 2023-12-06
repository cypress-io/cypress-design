<script lang="ts" setup>
import DocMenu from '@cypress-design/vue-docmenu'
</script>

# DocMenu

<DemoWrapper>
	<DocMenu 
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
