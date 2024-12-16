import { useState } from 'react'
import './App.css'
import Home from './Components/Home/Home' 
import { Route, Routes } from 'react-router-dom' 
import Admin from './Components/Admin/Admin' 
import Login from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp'
import SuperUserPage from './Components/SuperUser/SuperUser'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>  
      <Routes>
      <Route exact path='/' element={<Home />}/>
      <Route path='admin/' element={<Admin />}/> 
      <Route path='login/' element={<Login />}/> 
      <Route path='signup/' element={<SignUp />}/> 
      <Route path='superadmin/' element={<SuperUserPage />}/> 
      </Routes>
    </>
  )
}

export default App
