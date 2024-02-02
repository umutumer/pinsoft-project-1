'use client'
import React from 'react'
import { FiUser  } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";
const RegisterForm = () => {
  return (
    <form className='w-[30rem] h-[40rem] bg-white rounded-3xl flex flex-col items-center'>
    <h3 className='w-full text-center my-10 text-3xl text-blue-900 font-bold'>REGISTER</h3>
    <div className='relative w-full h-20 flex items-center justify-center my-5'>
      <input type="text" className='w-3/4 h-1/2 border px-7 py-8 rounded-lg' placeholder='username' />
      <FiUser className='absolute top-7 left-16 text-gray-400 text-2xl'/>
    </div>
    <div className='relative w-full h-20 flex items-center justify-center my-5'>
      <input type="password" className='w-3/4 h-1/2 border px-7 py-8 rounded-lg' placeholder='password' />
      <IoLockClosedOutline className='absolute top-7 left-16 text-gray-400 text-2xl'/>
    </div>
    <div className='relative w-full h-20 flex items-center justify-center my-5'>
      <input type="password" className='w-3/4 h-1/2 border px-7 py-8 rounded-lg' placeholder='rewrite password' />
      <IoLockClosedOutline className='absolute top-7 left-16 text-gray-400 text-2xl'/>
    </div>
    <button className='bg-265073 w-3/4 h-16 text-white text-3xl font-semibold rounded-xl my-10'>SIGN UP</button>
  </form>
  )
}

export default RegisterForm
