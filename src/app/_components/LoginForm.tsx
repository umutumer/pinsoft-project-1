'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import { FiUser, FiEyeOff } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password
    };

    try {
      const response = await fetch("https://pinsoft-project.onrender.com/api/authenticate", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      });
        if (response.ok) {
          const data = await response.json(); 
          console.log(data); 
      
          const token = data.token;
          console.log(token);
          localStorage.setItem('token',token)
          window.location.href = "http://localhost:3000/";
        }   

    } catch(error) {
      console.error("hata", error);
    }
  }

  return (
    <form className='w-[30rem] h-[40rem] bg-white rounded-3xl flex flex-col items-center' onSubmit={formSubmitHandler}>
      <h3 className='w-full text-center my-10 text-3xl text-blue-900 font-bold'>WELCOME</h3>
      <div className='relative w-full h-20 flex items-center justify-center my-10'>
        <input type="text" className='w-3/4 h-1/2 border px-7 py-8 rounded-lg' placeholder='username' onChange={(e) => setUsername(e.target.value)} />
        <FiUser className='absolute top-7 left-16 text-gray-400 text-2xl' />
      </div>
      <div className='relative w-full h-20 flex items-center justify-center my-10'>
        <input type="password" className='w-3/4 h-1/2 border px-7 py-8 rounded-lg' placeholder='********' onChange={(e)=> setPassword(e.target.value)} />
        <IoLockClosedOutline className='absolute top-7 left-16 text-gray-400 text-2xl' />
        <FiEyeOff className='absolute top-7 right-16 text-gray-400 text-2xl' />
      </div>
      <button type="submit" className='bg-265073 w-3/4 h-16 text-white text-3xl font-semibold rounded-xl my-10'>LOGIN</button>
      <div className='flex items-center'>
        <p>Not a member? </p>
        <Link href={"/register"} className='ml-2 text-blue-800'>Sign Up</Link>
      </div>
    </form>
  )
}

export default LoginForm;
