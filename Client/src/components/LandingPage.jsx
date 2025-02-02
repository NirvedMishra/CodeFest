import React from 'react'
import { Link } from 'react-router-dom'
const LandingPage = () => {
  return (
    <div className='w-screen flex flex-col mt-20'>
        <h1 className='text-6xl font-bold my-10'>Codeditor</h1>
        <div className='flex flex-row w-full justify-center gap-20 my-36'>
            <Link to='/createWorkspace' className='border w-72 h-72 flex justify-center items-center rounded-xl hover:bg-blue-700 cursor-pointer'>
                <h1 className='text-3xl text-center text-white'>Create Workspace</h1>
            </Link>
            <Link to='/openWorkspace' className='border w-72 h-72 flex justify-center items-center rounded-xl hover:bg-blue-700 cursor-pointer'>
            <h1 className='text-3xl text-center text-white'>Open Existing Workspace</h1>
            </Link>
        </div>
    </div>
  )
}

export default LandingPage