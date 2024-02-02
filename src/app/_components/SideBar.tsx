'use client'
import React from 'react'
import { Categories } from '../_types/types'
interface Category{
    categories:Categories[]
    handleChangeCategory: (categoryName:string) => void
    selectedCategory:string
  }
const SideBar = ({categories,handleChangeCategory,selectedCategory}:Category) => {
    return (
        <form className='bg-white w-[10.5rem] min-h-screen'>
            <div className='mt-16'>
            <h3 className='p-2 text-blue-800'>Filtre</h3>
            {categories.map((category) =>(
                <div key={category.id} className='flex items-center m-2'>
                     <input type="checkbox"
                     onChange={(e) => handleChangeCategory(category.name)} />
                     <p className='ml-1'>{category.name}</p>
                </div>
            ))}
            {selectedCategory !== "All Products" &&(
                        <button onClick={()=> handleChangeCategory("All Products")}>Filtreyi Temizle</button>
                     )}
            </div>
           
        </form>
    )
}

export default SideBar
