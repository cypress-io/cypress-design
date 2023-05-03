import * as React from 'react'
import Tabs from './Tabs'
import { Tab, variants } from '../constants'

export default (options: { tabs: Tab[]; variant?: keyof typeof variants }) => {
  return <Tabs {...options} />
}
