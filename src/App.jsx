import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Home from './Components/Home/Home' 
import { Route, Routes } from 'react-router-dom' 
import Admin from './Components/Admin/Admin' 
import Login from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>  
      <Routes>
      <Route exact path='/' element={<Home />}/>
      <Route path='admin/' element={<Admin />}/> 
      <Route path='login/' element={<Login />}/> 
      <Route path='signup/' element={<SignUp />}/> 
      </Routes>
    </>
  )
}

export default App
