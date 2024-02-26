'use client'
import { useEffect, useState } from "react";
import Navbar from "./_components/Navbar";
import Product from "./_components/Product";
import SideBar from "./_components/SideBar";
import { Categories, Products } from "./_types/types";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [products,setProducts] = useState<Products[]>([])
  const [searchTerm,setSearchTerm] = useState<string>("");
  console.log(searchTerm);
  
  const [categories,setCategories] = useState<Categories[]>([])
  console.log(products);
  const [selectedCategory,setSelectedCategory] = useState("All Products");
  console.log(selectedCategory);
  
  let filteredProductList;
  
    if (selectedCategory !== "All Products") {
      filteredProductList =  products.filter((product) =>product.category.name === selectedCategory);
    }else if (searchTerm !== "") {
      filteredProductList =  products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }else{
      filteredProductList = products;
    }

  const handleChangeCategory = (categoryName:string) => {
    setSelectedCategory(categoryName);
}
 
  
  
  
  const getCategories = async () =>{
    try {
      const response = await fetch("https://pinsoft-project.onrender.com/api/categories");
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
      const response = await fetch("https://pinsoft-project.onrender.com/api/products");
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
      <ToastContainer />
      <Navbar setSearchTerm={setSearchTerm} />
      <div className="flex">
        <SideBar categories={categories} handleChangeCategory={handleChangeCategory} selectedCategory={selectedCategory} />
        <Product filteredProductList={filteredProductList} />
      </div>
    </main>
  );
}
