import Tabs from './Tabs.vue'
import { Tab, variants } from '../constants'

export default (options: { tabs: Tab[]; variant?: keyof typeof variants }) => {
  return <Tabs {...options} />
}
