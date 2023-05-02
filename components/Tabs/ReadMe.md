<script lang="ts" setup>
import Tabs from './vue/Tabs.vue'
import { IconActionPlayVideo, IconActionRecord, IconDeviceLaptop, IconGeneralCrosshairs, IconSecurityLockLocked } from '@cypress-design/vue-icon'
</script>

# Tabs

<DemoWrapper>
  <p>default</p>
	<Tabs :tabs="[
    { id: 'ov', label: 'Overview' },
    { id: 'cl', label: 'Command Log' },
    { id: 'err', label: 'Errors', active:true},
    { id: 'reco', label: 'Recommendations' },
  ]"/>
  <div class="h-[24px]"/>
  <p>underline-small</p>
  <Tabs variant="underline-small" :tabs="[
    { id: 'ov', label: 'Overview', icon: IconActionPlayVideo, active: true },
    { id: 'cl', label: 'Command Log', icon: IconActionRecord },
    { id: 'err', label: 'Errors', iconAfter: IconSecurityLockLocked, tag: '13' },
    { id: 'reco', label: 'Recommendations', icon: IconGeneralCrosshairs },
  ]"/>
  <div class="h-[24px]"/>
  <p>underline-large</p>
  <Tabs variant="underline-large" :tabs="[
    { id: 'ov', label: 'Overview', active:true },
    { id: 'cl', label: 'Command Log' },
    { id: 'err', label: 'Errors' },
    { id: 'reco', label: 'Recommendations' },
  ]"/>
</DemoWrapper>

[figma::Tabs](https://www.figma.com/file/1WJ3GVQyMV5e7xVxPg3yID/Design-System%2C-v1.x---%40latest?type=design&node-id=1259-10337&t=31Ux0Tiv1c3LsT2Q-11)
