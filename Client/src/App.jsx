import { Outlet } from 'react-router-dom'
import './App.css'
// import * as monaco from 'monaco-editor'
// import Editor from '@monaco-editor/react'

function App() {

  return (
    <>
      <div className='text-lg text-center text-blue-500 '>
        <Outlet />
      </div>
    </>
  )
}

export default App
