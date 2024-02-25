'use client'
import React, { useState } from 'react'
import { FiUser  } from "react-icons/fi";
import { IoLockClosedOutline } from "react-icons/io5";


const RegisterForm = () => {
  const[username,setUsername] = useState<string>("");
  const[email,setEmail] = useState<string>("");
  const[password,setPassword] = useState<string>("");
  const[rePassword,setRePassword] = useState<string>("");
const registerFormSubmit =  async (e:React.FormEvent<HTMLFormElement>) =>{
  e.preventDefault();
 try{
  const formData = {
    username: username,
    email: email,
    password: password
  }
   if (password === rePassword) {
    const response = await fetch("https://pinsoft-project.onrender.com/api/register",{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
   })
     if (response.ok) {
      const data = await response.json();
      window.location.href = 'http://localhost:3000/';
      console.log(data);
     }
   }else{
    window.alert("İki şifre aynı değil!")
    
   }
 }catch(error){
  console.error("Register hatası:" , error);
  
 }
}
  return (
    <form className='w-[30rem] h-[40rem] bg-white rounded-3xl flex flex-col items-center' onSubmit={registerFormSubmit}>
    <h3 className='w-full text-center my-10 text-3xl text-blue-900 font-bold'>REGISTER</h3>
    <div className='relative w-full h-20 flex items-center justify-center my-5'>
      <input type="text" className='w-3/4 h-1/2 border px-7 py-8 rounded-lg' placeholder='username' onChange={(e) => setUsername(e.target.value)} />
      <FiUser className='absolute top-7 left-16 text-gray-400 text-2xl'/>
    </div>
    <div className='relative w-full h-20 flex items-center justify-center my-5'>
      <input type="text" className='w-3/4 h-1/2 border px-7 py-8 rounded-lg' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
      <FiUser className='absolute top-7 left-16 text-gray-400 text-2xl'/>
    </div>
    <div className='relative w-full h-20 flex items-center justify-center my-5'>
      <input type="password" className='w-3/4 h-1/2 border px-7 py-8 rounded-lg' placeholder='password'onChange={(e) => setPassword(e.target.value)} />
      <IoLockClosedOutline className='absolute top-7 left-16 text-gray-400 text-2xl'/>
    </div>
    <div className='relative w-full h-20 flex items-center justify-center my-5'>
      <input type="password" className='w-3/4 h-1/2 border px-7 py-8 rounded-lg' placeholder='rewrite password' onChange={(e) => setRePassword(e.target.value)}/>
      <IoLockClosedOutline className='absolute top-7 left-16 text-gray-400 text-2xl'/>
    </div>
    <input type='submit' className='bg-265073 w-3/4 h-16 text-white text-3xl font-semibold rounded-xl my-10' value={"SIGN UP"} />
  </form>
  )
}

export default RegisterForm
