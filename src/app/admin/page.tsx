'use client'
import React, { useState } from 'react'
import AdminNavbar from '../_components/AdminNavbar'
import { MdDelete, MdEdit } from "react-icons/md";
import Link from 'next/link';
const page = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleClikModal = () => {
        if (modalOpen == false) {
            setModalOpen(true);
        } else {
            setModalOpen(false);
        }
    }
    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-center bg-9eb8d9 relative'>
            <AdminNavbar />
            <div className='w-[90%] h-[45rem] bg-white flex flex-col items-center relative'>
                <h3 className='w-full text-center my-10 text-2xl text-blue-900'>Products</h3>
                <div className='w-[90%] flex items-center justify-end'>
                    <Link href={"/addproduct"} className='border-2 text-white bg-265073 py-2 px-4 rounded-3xl w-40'>New Product</Link>
                    <button className='border-2 text-gray-300 py-2 px-4 rounded-3xl w-40'>Export To Excel/</button>
                </div>
                <table className='w-[90%] h-[10rem] border mt-5'>
                    <thead className='bg-gray-200'>
                        <tr>
                            <th className='border border-gray-400'>Photo</th>
                            <th className='border border-gray-400'>Name</th>
                            <th className='border border-gray-400'>Explanation</th>
                            <th className='border border-gray-400'>Price(TL)</th>
                            <th className='border border-gray-400'>Category</th>
                            <th className='border border-gray-400'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='text-center'>
                            <td className='border border-gray-400'>örnek.jpg</td>
                            <td className='border border-gray-400'>örnek isim</td>
                            <td className='border border-gray-400'>örnek açıklama</td>
                            <td className='border border-gray-400'>örnek fiyat</td>
                            <td className='border border-gray-400'>örnek kategori</td>
                            <td className='border border-gray-400'><div className='flex text-3xl items-center justify-center'><Link href={"/updateproduct"}><MdEdit /></Link><button onClick={() => handleClikModal()}><MdDelete /></button></div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {modalOpen && (
                <div className='absolute w-full min-h-screen top-0 z-40 bg-black bg-opacity-60 flex items-center justify-center'>
                    <div className='relative bg-white w-[30rem] h-72 rounded-2xl'>
                        <p className='ml-5 mt-10'>Are you sure you want to delete this product ?</p>
                        <div className='w-[90%] flex items-center justify-end absolute bottom-10 right-5'>
                            <button className='border-2 text-gray-300 py-2 px-4 rounded-3xl w-40 mr-2' onClick={() => handleClikModal()}>Cancel</button>
                            <button className='border-2 text-white bg-265073 py-2 px-4 rounded-3xl w-40'>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default page
