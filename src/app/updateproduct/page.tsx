'use client'
import React from 'react'
import AdminNavbar from '../_components/AdminNavbar'
import UptadeProductForm from '../_components/UpdateProductForm'

const page = () => {
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center bg-9eb8d9'>
      <AdminNavbar />
      <UptadeProductForm />
    </div>
  )
}

export default page
