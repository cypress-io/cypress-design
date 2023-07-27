import { useState } from 'react'
import logo from './logo.svg'
import Checkbox from '@cypress-design/react-checkbox'
import { IconActionQuestionMarkCircle } from '@cypress-design/react-icon'
import StatusIcon from '@cypress-design/react-statusicon'
import Spinner from '@cypress-design/react-spinner'
import './App.css'
import { SimpleStatusIcon } from '@cypress-design/react-statusicon'
import Modal from '@cypress-design/react-modal'
import Button from '@cypress-design/react-button'
import Tabs from '@cypress-design/react-tabs'
import Tooltip from '@cypress-design/react-tooltip'

function App() {
  const [count, setCount] = useState(0)
  const [isChecked, setChecked] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showOtherModal, setShowOtherModal] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <Tabs
          tabs={[
            {
              label: 'Tab 1',
              id: 'tab1',
              'data-testid': 'tab1',
            },
            {
              label: 'Tab 2',
              id: 'tab2',
              'data-testid': 'tab2',
            },
          ]}
        />
        <Tooltip popper={<b>popper</b>}>
          <p>Tooltip content</p>
        </Tooltip>
        <Tooltip popper={<b>another popper</b>}>
          <p>another Tooltip content</p>
        </Tooltip>
        <img src={logo} className="App-logo" alt="logo" />
        <p className="text-jade-500">Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
          <Checkbox
            label="Sample"
            checked={isChecked}
            onChange={() => setChecked(!isChecked)}
          />
        </p>
        <Spinner />
        <table>
          <tbody>
            <tr>
              <td className="py-2">
                <StatusIcon status="running" variant="outline" size="16" />
              </td>
            </tr>
          </tbody>
        </table>
        <SimpleStatusIcon status="failed" size="16" />
        <IconActionQuestionMarkCircle
          strokeColor={isChecked ? 'jade-800' : 'jade-500'}
          fillColor="jade-500"
        />
      </header>
      <div className="h-[500px]" />
      <div className="text-center">
        <Button className="mx-auto my-4" onClick={() => setShowModal(true)}>
          Open Modal
        </Button>
        <Button
          className="mx-auto my-4"
          onClick={() => setShowOtherModal(true)}
        >
          Open Other Modal
        </Button>
      </div>
      <Modal
        title="Modal title"
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        <p>Modal content</p>
      </Modal>
      <Modal
        title="Other modal title"
        show={showOtherModal}
        onClose={() => setShowOtherModal(false)}
      >
        <p>Other Modal content</p>
      </Modal>
    </div>
  )
}

export default App
