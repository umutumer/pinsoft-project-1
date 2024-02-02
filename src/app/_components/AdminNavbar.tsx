'use client'
import Link from 'next/link';
import React from 'react'
import { FiUser } from "react-icons/fi";
import { MdOutlineLogout } from "react-icons/md";
const AdminNavbar = () => {

    return (
        <nav className='bg-265073 w-full h-16 fixed top-0 z-50'>
            <div className='flex text-white relative'>
                <div className='absolute top-2 right-5 flex items-center'>
                    <div className='flex items-center'><FiUser className='m-2  text-3xl' /> <p>Username</p></div>
                    <Link href={"/"}><MdOutlineLogout className='m-2  text-3xl' /></Link>
                </div>
            </div>
        </nav>
    )
}

export default AdminNavbar
