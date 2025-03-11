import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/auth-component/Layout'
import Register from './pages/auth-page/Register'
import Login from './pages/auth-page/Login'
import Header from './components/Header'
import Profile from './pages/profile'
import ProtectToRoutes from './components/Protect-to-routes'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <Header/>
   <Routes>
    <Route path='/' element={<ProtectToRoutes><Layout/></ProtectToRoutes>}>
      <Route path='register' element={<Register/>}/>
      <Route path='login' element={<Login/>} />
      <Route/>
    </Route>
    <Route path='/profile' element={<ProtectToRoutes><Profile/></ProtectToRoutes>}/>
   </Routes>
   </>
  )
}

export default App
