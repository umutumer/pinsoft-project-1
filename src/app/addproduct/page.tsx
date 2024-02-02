'use client'
import React from 'react'
import AdminNavbar from '../_components/AdminNavbar'
import AddProductForm from '../_components/AddProductForm'

const page = () => {
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center bg-9eb8d9'>
      <AdminNavbar />
      <AddProductForm />
    </div>
  )
}

export default page
