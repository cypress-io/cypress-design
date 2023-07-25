<script lang="ts" setup>
import Tabs from './vue/Tabs.vue'
import { IconActionPlayVideo, IconActionRecord, IconGeneralCrosshairs, IconSecurityLockLocked } from '@cypress-design/vue-icon'

const demoTabsSmall = [
    { id: 'ov', label: 'Overview', icon: IconActionPlayVideo, active: true },
    { id: 'cl', label: 'Command Log', icon: IconActionRecord },
    { id: 'err', label: 'Errors', iconAfter: IconSecurityLockLocked, tag: '13' },
    { id: 'reco', label: 'Recommendations', icon: IconGeneralCrosshairs },
  ]

const demoTabsLarge = [
    { id: 'ov', label: 'Overview', active: true },
    { id: 'cl', label: 'Command Log' },
    { id: 'err', label: 'Errors', tag: '13' },
    { id: 'reco', label: 'Recommendations' },
  ]

const types = ['default', 'dark-small', 'dark-large', 'underline-small', 'underline-center', 'underline-large']
</script>

# Tabs

<DemoWrapper>
  <template v-for="type in types">
    <p>{{ type }}</p>
    <Tabs :variant="type" :tabs="type.includes('large') ? demoTabsLarge : demoTabsSmall"/>
    <div class="h-[20px]"/>
  </template>
</DemoWrapper>

[figma::Tabs](https://www.figma.com/file/1WJ3GVQyMV5e7xVxPg3yID/Design-System%2C-v1.x---%40latest?type=design&node-id=1259-10337&t=31Ux0Tiv1c3LsT2Q-11)
