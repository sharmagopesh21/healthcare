import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/login'
import Doctor from './components/Doctor'
import Insurance from './components/insurance'
import User from './components/user'
import Signup from './components/signup'
import { BrowserRouter as Router, Routes , Route,} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from './context/AuthContext'

function App() {
  const {authUser} = useAuthContext();
  return (
    <>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/doctor' element={<Doctor/>}/>
          <Route path='/insurance' element={<Insurance/>}/>
          <Route path='/user' element={<User/>}/>
        </Routes>
        <ToastContainer position='top-center'/>
    </>
  )
}

export default App
