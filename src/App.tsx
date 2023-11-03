import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import Header from './screens/main/Header/Header'
import Main from './screens/main/main/Main'
import Index from './screens/Index';

function App() {

  return (
    <BrowserRouter>
      <Index />
    </BrowserRouter>
  )
}

export default App
