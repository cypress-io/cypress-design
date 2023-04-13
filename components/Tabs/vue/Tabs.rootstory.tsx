import { Tab } from '../constants'
import Tabs from './Tabs.vue'

export default (options: { tabs: Tab[] }) => {
  return <Tabs {...options} />
}
