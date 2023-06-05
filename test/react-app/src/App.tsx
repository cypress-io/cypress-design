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

function App() {
  const [count, setCount] = useState(0)
  const [isChecked, setChecked] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
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
            <td className="py-2">
              <StatusIcon status="running" variant="outline" size="16" />
            </td>
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
      </div>
      <Modal
        title="Modal title"
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        <p>Modal content</p>
      </Modal>
    </div>
  )
}

export default App
