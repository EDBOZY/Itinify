import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import Hero from './components/ui/custom/Hero'
import Popular from './components/ui/custom/Popular'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/*Hero*/}
      <Hero/>

    </>
  )
}

export default App
