import React from 'react'
import RegisterForm from '../_components/RegisterForm'
import Navbar from '../_components/Navbar'

const page = () => {
  return (
    <div className='bg-9eb8d9 min-h-screen w-full flex flex-col items-center justify-center'>
        <Navbar/>
      <RegisterForm />
    </div>
  )
}

export default page
