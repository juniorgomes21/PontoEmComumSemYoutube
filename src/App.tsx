import { useState } from 'react'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import Main from './Main/Main'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="text-red-600">
      <Header/>
      <Main/>
    </div>
  )
}

export default App
