'use client'
import Navbar from '@/app/_components/Navbar';
import { Products } from '@/app/_types/types';
import React from 'react'

const getProducts = async (id: number) => {
    try {
        const response = await fetch(`http://localhost:8080/api/products/${id}`);
        if (!response.ok) {
            throw new Error('Bir şeyler yanlış gitti');
        }
        const result = await response.json();
        return result;

    } catch (error) {
        console.error('Ürünleri getirirken hata oluştu:', error);
    }
};
const page = async ({ params }: { params: { id: number } }) => {
    const product: Products = await getProducts(params.id);



    return (
        <main className="bg-9eb8d9 min-h-screen flex items-center justify-center">
            <Navbar />
            <div className='w-[50rem] h-[30rem] bg-white flex flex-col items-center relative rounded-3xl'>
                <img src="https://images.migrosone.com/sanalmarket/product/37455083/37455083-8f6bf9-1650x1650.JPG" alt="" className='w-48 h-60 border-b border-gray-300 ' />
                <p>{product.name}</p>
                <p>{product.explanation}</p>
                <p>{product.price}₺</p>
                <button className='bg-265073  px-5 py-1 text-white rounded-xl absolute bottom-10'>Sepete Ekle</button>
            </div>
        </main>
    )
}

export default page
