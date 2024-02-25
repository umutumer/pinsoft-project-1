import React, { useEffect, useState } from 'react';
import { Categories } from '../_types/types';

const AddProductForm = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [category_id, setCategory_id] = useState<number>();
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>();
  const [explanation, setExplanation] = useState<string>('');
  const [base64image, setBase64Image] = useState<string>('');
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
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
    };
    fetchData();
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!name || !price || !explanation || !base64image || !category_id || !token) {
      console.error('Lütfen tüm alanları doldurun.');
      return;
    }
  
    const formData = {
      name: name,
      explanation: explanation,
      price: price,
      base64Image: base64image,
      categoryId: category_id,
      token: token,
    };
  
    try {
      const response = await fetch("https://pinsoft-project.onrender.com/api/products", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.location.href = 'http://localhost:3000/admin';
      } else {
        throw new Error('Ürün eklenirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Ürün eklenirken hata oluştu:', error);
  
      console.error('Sunucu hatası:', error);
    }
  };
  
  
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const image = reader.result as string;
        setBase64Image(image);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className='w-[50rem] h-[40rem] bg-white rounded-3xl flex flex-col items-center' onSubmit={handleFormSubmit}>
      <h3 className='w-full text-center my-10 text-3xl text-blue-900 font-bold'>ADD PRODUCT</h3>
      <div className='relative w-[90%] h-20 flex items-center justify-between my-5'>
        <input type="text" className='w-[20rem] h-1/2 border px-7 py-8 rounded-lg' placeholder='Product Name' onChange={(e) => setName(e.target.value)} />
        <label htmlFor='file-input' className='relative w-[20rem] h-20 flex items-center justify-between my-5' >
          <input
            id='file-input'
            type='file'
            className="file-input file-input-bordered file-input-md w-[20rem] h-5/6 max-w-xs rounded-lg file-input-ghost text-gray-400"
            onChange={(e) => handleFileChange(e)}
          />
        </label>
      </div>
      <div className='relative w-[90%] h-20 flex items-center justify-between my-5'>
        <input type="number" className='w-[20rem] h-1/2 border px-7 py-8 rounded-lg' placeholder='price' onChange={(e) => setPrice(parseFloat(e.target.value))} />
        <select name="category" id="category" className='w-[20rem] h-1/2 border px-7 py-8 rounded-lg text-gray-400' onChange={(e) => setCategory_id(parseInt(e.target.value))}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className='relative w-[90%] h-40 flex items-center justify-between my-5'>
        <input className='w-full max-h-full min-h-40 px-5 py-5 border  rounded-lg' placeholder='Write explanation here' onChange={(e) => setExplanation(e.target.value)} />
      </div>
      <input type='submit' className='bg-265073 w-3/4 h-16 text-white text-center text-3xl font-semibold rounded-xl my-5' value="SAVE" />
    </form>
  );
}

export default AddProductForm;
