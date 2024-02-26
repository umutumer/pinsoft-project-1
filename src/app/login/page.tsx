'use client'
import React from 'react'
import Navbar from '../_components/Navbar'
import LoginForm from '../_components/LoginForm'
import { ToastContainer } from 'react-toastify'

const page = () => {
  return (
    <div className='bg-9eb8d9 min-h-screen w-full flex flex-col items-center justify-center'>
      <ToastContainer />
      <Navbar />
      <LoginForm />
    </div>
  )
}

export default page
