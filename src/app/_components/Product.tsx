'use client'
import React from 'react'
import { Products } from '../_types/types'
import Link from 'next/link'

interface Product{
  filteredProductList:Products[]
}
const Product = ({filteredProductList}:Product) => {
  console.log(filteredProductList);
  
  return (
    <div className=' mt-16 flex flex-wrap'>
      {filteredProductList.map((product) =>(
        <div key={product.id} className='bg-white p-2 flex flex-col items-center m-5 rounded-xl w-48 h-80 ' >
         <Link className='w-full h-52' href={`/products/${product.id}`}> <img src={product.base64Image} alt="productImg" className='w-full max-h-52 border-b border-gray-300' /></Link>
          <p>{product.name}</p>
          <p>{product.price}₺</p>
          <button className='bg-265073 my-1 px-2 py-1 text-white rounded-xl'>Sepete Ekle</button>
        </div>
      ))}
    </div>
  )
}

export default Product
