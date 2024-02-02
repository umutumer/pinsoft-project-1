'use client'
import React, { useEffect, useState } from 'react'
import SideBar from '../_components/SideBar'
import Product from '../_components/Product'
import Navbar from '../_components/Navbar'
import { Categories, Products } from '../_types/types'

const page = () => {
    const [products,setProducts] = useState<Products[]>([])
    const [categories,setCategories] = useState<Categories[]>([])
    console.log(products);
    const [selectedCategory,setSelectedCategory] = useState("All Products");
    console.log(selectedCategory);
    
  
    const filteredProductList:Products[] = selectedCategory !== "All Products" ? products.filter((product) =>product.category.name === selectedCategory):products;
    
    const handleChangeCategory = (categoryName:string) => {
      setSelectedCategory(categoryName);
  }
    
    
    
    const getCategories = async () =>{
      try {
        const response = await fetch("http://localhost:8080/api/categories");
        if (!response.ok) {
          throw new Error('Bir şeyler yanlış gitti');
        }
        const result = await response.json();
        setCategories(result);
      } catch (error) {
        console.error('Kategorileri getirirken hata oluştu:', error);
      }
    }
    const getProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/products");
        if (!response.ok) {
          throw new Error('Bir şeyler yanlış gitti');
        }
        const result = await response.json();
        setProducts(result);
      } catch (error) {
        console.error('Ürünleri getirirken hata oluştu:', error);
      }
    };
    
    useEffect(() => {
      getProducts();
      getCategories();
    }, []);
    
  
  return (
    <main className="bg-9eb8d9 min-h-screen">
    <Navbar />
    <div className="flex">
      <SideBar categories={categories} handleChangeCategory={handleChangeCategory} selectedCategory={selectedCategory} />
      <Product filteredProductList={filteredProductList} />
    </div>
  </main>
  )
}

export default page
