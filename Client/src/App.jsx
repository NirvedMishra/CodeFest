import { Outlet } from 'react-router-dom'
import './App.css'
import AuthProvider from './router/AuthProvider'
import Navbar from './components/Navbar'
// import * as monaco from 'monaco-editor'
// import Editor from '@monaco-editor/react'

function App() {

  return (
    <>
    <AuthProvider>
      <Navbar/>
      <div className='text-lg text-center text-blue-500 '>
        <Outlet />
      </div>
      </AuthProvider>
    </>
    
  )
}

export default App
