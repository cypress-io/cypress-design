import * as React from 'react'
import Tabs from './Tabs'
import { Tab } from '../constants'

export default (options: { tabs: Tab[] }) => {
  return <Tabs {...options} />
}
