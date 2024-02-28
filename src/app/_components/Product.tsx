'use client'
import React, { useEffect, useState } from 'react'
import { Products } from '../_types/types'
import Link from 'next/link'
import { Bounce, toast } from 'react-toastify'
import Image from 'next/image'

interface Product{
  filteredProductList:Products[]
}
const Product = ({filteredProductList}:Product,) => {
  console.log(filteredProductList);
  const [cart,setCart] = useState<string[]>([])
  
  const handleAddToCart = ( pname: string, pprice: number, pbase64Image:string) => {
    const quantity = 1;
    const existingCartItem : any = cart.find((item:any) => item.name === pname);

    try{
      if (existingCartItem) {
        const updatedCart:any = cart.map((item:any) =>
          item.name === existingCartItem.name
            ? { ...item, quantity: item.quantity + 1 ,price:pprice +pprice }
            : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      } else {
        const updatedCart:any = [...cart, { userId: 1, name: pname, price: pprice, quantity: quantity ,base64Image:pbase64Image }];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }
    }catch(error){
      console.error("sepete eklenirken hata oldu");
      
    }finally{
      toast.success('🛒Sepete Eklendi!', {
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
    }
  };
  useEffect(() => {
    const cartStorage: string | null = localStorage.getItem('cart');
    if (cartStorage) {
      setCart(JSON.parse(cartStorage));
    }
  }, []);
  return (
    <div className=' mt-16 flex flex-wrap'>
      {filteredProductList.map((product) =>(
        <div key={product.id} className='bg-white p-2 flex flex-col items-center m-5 rounded-xl w-48 h-80 ' >
         <Link className='w-full h-52' href={`/products/${product.id}`}> <Image src={product.base64Image} alt="productImg" className='w-full h-52 object-cover border-b border-gray-300' /></Link>
          <p>{product.name}</p>
          <p>{product.price}₺</p>
          <button className='bg-265073 my-1 px-2 py-1 text-white rounded-xl' onClick={() => handleAddToCart(product.name,product.price,product.base64Image)}>Sepete Ekle</button>
        </div>
      ))}
    </div>
  )
}

export default Product
