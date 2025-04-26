import { useState } from 'react'
import './App.css'
import * as components from "./components";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

const componentKeys = Object.keys(components);

function App() {
  const [componentKey, setComponentKey] = useState<typeof componentKeys[number]>(componentKeys[0]);
  const Components = components[componentKey as keyof typeof components];

  return (
    <QueryClientProvider client={queryClient}>
      <div className="layout">
        <div className="sidebar">
          {componentKeys.map((key) => (
            <button className='w-fit' key={key} onClick={() => setComponentKey(key)}>
              {key}
            </button>
          ))}
        </div>
        <div className="content">
          <Components />
        </div>
      </div>
    </QueryClientProvider>
  )
}

export default App
