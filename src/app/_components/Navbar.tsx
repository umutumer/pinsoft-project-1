'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
const Navbar = ({setSearchTerm}:any) => {
    const[modalOpen,setModalOpen] = useState(false);
    const [cart,setCart] = useState<string[]>([])

    console.log(cart.length);

    
    const handleClikModal = () =>{
        if (modalOpen == false) {
            setModalOpen(true);
        }else{
            setModalOpen(false);
        }
    }
    const seachTermInput = (searchTerm:string) =>{
        setSearchTerm(searchTerm)
       }
       useEffect(() => {
        const cartStorage: string | null = localStorage.getItem('cart');
        if (cartStorage) {
          setCart(JSON.parse(cartStorage));
        }
      }, []);
    return (
        <nav className='bg-265073 w-full flex justify-between items-center fixed top-0'>
            <div className='relative w-40'>
                <input type="text"  placeholder='Search' className='w-full px-7 py-2 rounded-xl m-2 text-start' onChange={(e)=>seachTermInput(e.target.value)} />
                <div className='absolute flex items-center top-4 left-3 text-gray-400'>
                    <button>
                    <CiSearch className='text-2xl' />
                    </button>
                    
                </div>
            </div>
            <div className='flex text-white relative'>
            <button onClick={() => handleClikModal()}><FiUser className='m-2  text-3xl'/></button>
            <Link href={'/cart'} className='relative mr-3'>
            <IoCartOutline className='m-2  text-3xl' />
            <p className='absolute top-0 -right-1'>{cart.length}</p>
            </Link>
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
