import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as components from "./components";

const componentKeys = Object.keys(components);

function App() {
  const [componentKey, setComponentKey] = useState<typeof componentKeys[number]>(componentKeys[0]);
  const Components = components[componentKey as keyof typeof components];

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Components />
      </div>
      <div className="flex flex-row gap-2">
        {componentKeys.map((key) => (
          <button key={key} onClick={() => setComponentKey(key)}>
            {key}
          </button>
        ))}
      </div>
    </>
  )
}

export default App
