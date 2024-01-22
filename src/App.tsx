import { useState } from 'react'
import freddy from './assets/freddy.jpg'
import spencer from '.assets/spencer.jpg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://github.com/suspencer14" target="_blank">
          <img src={spencer} className="logo" alt="Spencer" />
        </a>
        <a href="https://github.com/fzwirb/" target="_blank">
          <img src={freddy} className="logo react" alt="Freddy" />
        </a>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count = Math.random() % 10)}>
          {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
