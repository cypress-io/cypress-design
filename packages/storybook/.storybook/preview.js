import { addParameters } from '@storybook/react'

addParameters({
  options: {
    storySort: {
      order: ['Intro', 'Design system', 'Dashboard', 'Dashboard single-use'],
    },
  },
  viewMode: 'docs',
})

import 'windi.css'
import '@frontend/dashboard/src/main.scss'
import './style.scss'
