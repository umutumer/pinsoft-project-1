'use client'
import React from 'react'
import Navbar from '../_components/Navbar'
import { MdDelete } from "react-icons/md";
const page = () => {
  return (
    <div className='bg-9eb8d9 min-h-screen w-full'>
        <Navbar />
     <div className='w-full h-screen flex items-center justify-center'>
     <div className='w-[70rem] h-[40rem] bg-white flex flex-col items-center relative rounded-3xl'>
     <table className='w-[70%] h-[10rem] border mt-40'>
        <thead className='bg-gray-200'>
            <tr>
                <th className='border border-gray-400'>Ürün Resmi</th>
                <th className='border border-gray-400'>Ürün Adı</th>
                <th className='border border-gray-400'>Adeti</th>
                <th className='border border-gray-400'>Spetten Çıkar Btn</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className='border border-gray-400'>örnek.jpg</td>
                <td className='border border-gray-400'>örnek isim</td>
                <td className='border border-gray-400'>örnek fiyat</td>
                <td className='border border-gray-400'><MdDelete /></td>
            </tr>
        </tbody>
      </table>
      <div className='absolute bottom-5 left-10'>
        <button className='border-2 text-gray-300 py-2 px-4 rounded-3xl w-52'>Alışverişe Devam Et</button>
      </div>
      <div className='absolute bottom-5 right-10'>
        <button className='border-2 text-white bg-265073 py-2 px-4 rounded-3xl w-52'>Satın Al</button>
      </div>
     </div>
     </div>
    </div>
  )
}

export default page
