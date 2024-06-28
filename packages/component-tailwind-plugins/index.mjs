import plugin from 'tailwindcss/plugin'
import Accordion from '@cypress-design/constants-accordion/tailwind'
import Alert from '@cypress-design/constants-alert/tailwind'
import Button from '@cypress-design/constants-button/tailwind'
import Checkbox from '@cypress-design/constants-checkbox/tailwind'
import DocMenu from '@cypress-design/constants-docmenu/tailwind'
import Menu from '@cypress-design/constants-menu/tailwind'
import Modal from '@cypress-design/constants-modal/tailwind'
import Spinner from '@cypress-design/constants-spinner/tailwind'
import StatusIcon from '@cypress-design/constants-statusicon/tailwind'
import Tabs from '@cypress-design/constants-tabs/tailwind'
import Tag from '@cypress-design/constants-tag/tailwind'
import TestResult from '@cypress-design/constants-testresult/tailwind'

const componentPlugins = [
  plugin(Accordion),
	plugin(Alert),
	plugin(Button),
	plugin(Checkbox),
	plugin(DocMenu),
	plugin(Menu),
	plugin(Modal),
	plugin(Spinner),
	plugin(StatusIcon),
	plugin(Tabs),
	plugin(Tag),
	plugin(TestResult)
]
  
export default componentPlugins