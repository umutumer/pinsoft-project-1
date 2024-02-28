'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../_components/Navbar'
import { MdDelete } from "react-icons/md";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer, toast } from 'react-toastify';
const page = () => {
  const [cart, setCart] = useState<string[]>([])

  const handleQuantityPlus = (cname: string, cprice: number) => {
    const existingCartItem = cart.find((item) => item.name === cname);

    if (existingCartItem) {
      const updatedCart = cart.map((item) =>
        item.name === existingCartItem.name
          ? { ...item, quantity: item.quantity + 1, totalprice: item.quantity * cprice + cprice }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  }
  const handleQuantityMinus = (cname: string) => {
    const existingCartItem = cart.find((item) => item.name === cname);

    if (existingCartItem) {
      const updatedCart = cart.map((item) =>
        item.name === existingCartItem.name
          ? { ...item, quantity: item.quantity - 1, totalprice: item.price - item.price }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };
  const deleteFromCart = (cname: string) => {
    const existingCartItem = cart.filter((item) => item.name !== cname);
    toast.success('🛒Sepetten başarıyla Silindi!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });


    setCart(existingCartItem);
    localStorage.setItem('cart', JSON.stringify(existingCartItem));
  }
  const postOrder = async (pbase64Image: string, pname: string, pprice: number, pquantity: number) => {
    try {
      const orderData = {
        userId: 1,
        base64Image: pbase64Image,
        name: pname,
        price: pprice,
        quantity: pquantity,
      }
      console.log(orderData);

      const response = await fetch("https://pinsoft-project.onrender.com/api/orders", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      })
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error("sipariş verilirken bir hata oluştu", error);

    } finally {
      toast.success('Siparişiniz başarıyla verildi', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
        localStorage.setItem('cart', JSON.stringify([]));
        window.location.href = 'http://localhost:3000/';
    }
  }


  useEffect(() => {
    const cartStorage: string | null = localStorage.getItem('cart');
    if (cartStorage) {
      setCart(JSON.parse(cartStorage));
    }
  }, []);
  return (
    <div className='bg-9eb8d9 min-h-screen w-full'>
      <ToastContainer />
      <Navbar />
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='w-[70rem] h-[40rem] bg-white flex flex-col items-center relative rounded-3xl'>
          <table className='w-[70%] h-[10rem] border mt-40'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='border border-gray-400'>Ürün Resmi</th>
                <th className='border border-gray-400'>Ürün Adı</th>
                <th className='border border-gray-400'>Ürün Fiyatı</th>
                <th className='border border-gray-400'>Adeti</th>
                <th className='border border-gray-400'>Spetten Çıkar Btn</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index} className='text-center'>
                  <td className='border border-gray-400 w-24 p-2'><img src={item.base64Image} alt={item.name} /></td>
                  <td className='border border-gray-400'>{item.name}</td>
                  {item.totalprice ? (
                    <td className='border border-gray-400'>{item.totalprice}₺</td>
                  ) : (
                    <td className='border border-gray-400'>{item.price}₺</td>
                  )}
                  <td className='border-b border-gray-400 w-full h-full flex items-center justify-center'>
                    {item.quantity !== 1 ? (
                      <button className=' text-red-600 text-2xl font-bold' onClick={() => handleQuantityMinus(item.name)} ><CiCircleMinus /></button>
                    ) : <button className=' text-gray-600 text-2xl font-bold' disabled><CiCircleMinus /></button>}
                    {item.quantity}
                    <button className=' text-green-600 text-2xl font-bold' onClick={() => handleQuantityPlus(item.name, item.price)}><CiCirclePlus /></button>
                  </td>
                  <td className='border border-gray-400'>
                    <button onClick={() => deleteFromCart(item.name)} className='text-red-600 text-3xl'><MdDelete /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='absolute bottom-5 left-10'>
            <button className='border-2 text-gray-300 py-2 px-4 rounded-3xl w-52' onClick={() => window.location.href = "http://localhost:3000/"}>Alışverişe Devam Et</button>
          </div>
          <div className='absolute bottom-5 right-10'>
            <button className='border-2 text-white bg-265073 py-2 px-4 rounded-3xl w-52' onClick={() => {
              const base64Image = cart[0].base64Image;
              const name = cart[0].name;
              const price = cart[0].price;
              const quantity = cart[0].quantity;
             
              console.log(base64Image);
              console.log(name);
              console.log(price);
              console.log(quantity);
              postOrder(base64Image, name, price, quantity)
            }}>Satın Al</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
