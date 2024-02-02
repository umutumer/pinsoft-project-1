'use client'
import React from 'react'

const UptadeProductForm = () => {
  return (
    <form className='w-[50rem] h-[40rem] bg-white rounded-3xl flex flex-col items-center'>
    <h3 className='w-full text-center my-10 text-3xl text-blue-900 font-bold'>Update PRODUCT</h3>
    <div className='relative w-[90%] h-20 flex items-center justify-between my-5'>
      <input type="text" className='w-[20rem] h-1/2 border px-7 py-8 rounded-lg' placeholder='Product Name' />
      <input type='text' className='w-[20rem] h-1/2 border px-7 py-8 rounded-lg' placeholder='Add Photo' />
    </div>
    <div className='relative w-[90%] h-20 flex items-center justify-between my-5'>
      <input type="number"  className='w-[20rem] h-1/2 border px-7 py-8 rounded-lg' placeholder='price' />
      <select name="category" id="category"  className='w-[20rem] h-1/2 border px-7 py-8 rounded-lg'>
        <option value="Elektronik">Elektronik</option>
        <option value="Giyim">Giyim</option>
        <option value="Kitap">Kitap</option>
      </select>
    </div>
    <div className='relative w-[90%] h-40 flex items-center justify-between my-5'>
      <textarea className='w-full max-h-full min-h-40 px-5 py-5 border  rounded-lg' placeholder='Write explanation here' />

    </div>
    <button className='bg-265073 w-3/4 h-16 text-white text-3xl font-semibold rounded-xl my-5'>SAVE</button>
  </form>
  )
}

export default UptadeProductForm
