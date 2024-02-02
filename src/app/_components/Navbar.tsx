'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
const Navbar = () => {
    const[modalOpen,setModalOpen] = useState(false);

    const handleClikModal = () =>{
        if (modalOpen == false) {
            setModalOpen(true);
        }else{
            setModalOpen(false);
        }
    }
    return (
        <nav className='bg-265073 w-full flex justify-between items-center fixed top-0'>
            <div className='relative w-40'>
                <input type="text"  placeholder='Search' className='w-full px-7 py-2 rounded-xl m-2 text-start' />
                <div className='absolute flex items-center top-4 left-3 text-gray-400'>
                    <button>
                    <CiSearch className='text-2xl' />
                    </button>
                    
                </div>
            </div>
            <div className='flex text-white relative'>
            <button onClick={() => handleClikModal()}><FiUser className='m-2  text-3xl'/></button>
            <IoCartOutline className='m-2  text-3xl' />
            {modalOpen && (
                <div className='absolute top-12 w-40 -left-32 bg-white text-blue-800 p-3 m-1 rounded-lg'>
                    <Link href={"/login"} className='w-full'>Sign In</Link> <br />
                    <Link href={"/myorder"}>Siparişlerim</Link>
                </div>
            )}
            </div>
        </nav>
    )
}

export default Navbar
