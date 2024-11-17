import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Home from './Components/Home/Home' 
import { Route, Routes } from 'react-router-dom' 
import Admin from './Components/Admin/Admin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>  
      <Routes>
      <Route exact path='/' element={<Home />}/>
      <Route path='admin/' element={<Admin />}/>
      </Routes>
    </>
  )
}

export default App
