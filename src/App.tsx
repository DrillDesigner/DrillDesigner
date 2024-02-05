import { useState } from 'react'
import freddy from './assets/freddy.jpg'
import spencer from './assets/spencer.jpg'
import './App.css'

function App() {
  const [spin, setStyle] = useState("animation: logo-spin infinite 1s linear;")
  const [count, setCount] = useState(1);

  const changeSpeed = () => {
    setStyle("animation: logo-spin infinite " + String(count * 0.9) + "s linear;");
    setCount(count + 1);
  }

  return (
    <>
      <div>
        <a href="https://github.com/suspencer14" target="_blank">
          <img src={spencer} className="logo react" alt="Spencer" />
        </a>
        <a href="https://github.com/fzwirb/" target="_blank">
          <img style={spin} src={freddy} className="logo react" alt="Freddy" />
        </a>
      </div>
      <div className="card">
        <button onClick={changeSpeed}>
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
