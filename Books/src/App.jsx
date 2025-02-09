import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'

 function App() {

  
  return (
    <>
    <div>
      <Header/>
      <Outlet/>
    </div>
      
      
    </>
  )
}

export default App
