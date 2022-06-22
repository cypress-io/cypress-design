import { useState } from 'react'
import logo from './logo.svg'
import Checkbox from '@cypress-design/react-checkbox'
import { IconActionQuestionMarkCircle } from '@cypress-design/react-icon'
import Spinner from '@cypress-design/react-spinner'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [isChecked, setChecked] = useState(false)

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
        <IconActionQuestionMarkCircle
          strokeColor="jade-800"
          fillColor="jade-500"
        />
      </header>
    </div>
  )
}

export default App
