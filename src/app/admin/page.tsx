'use client'
import React, { useEffect, useState } from 'react'
import AdminNavbar from '../_components/AdminNavbar'
import { MdDelete, MdEdit } from "react-icons/md";
import Link from 'next/link';
import { Categories, Products } from '../_types/types';
import { MdOutlineCancel } from "react-icons/md";
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer, toast } from 'react-toastify';
const page = () => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [upDelModal, setUpDelModal] = useState(false);
    const [products, setProducts] = useState<Products[]>([]);
    const [productId, setProductId] = useState<number>(0);
    console.log(productId);
    const token = localStorage.getItem('token');


    const handleClikModal = (id: number) => {
        if (deleteModalOpen == false) {
            setDeleteModalOpen(true);
            setProductId(id);
        } else {
            setDeleteModalOpen(false);
            setProductId(id);
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
    const handleDeleteProduct = async () => {
        try {
            const response = await fetch(`https://pinsoft-project.onrender.com/api/products/delete/${productId}/${token}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                console.log('Ürün başarıyla silindi.');
                setDeleteModalOpen(false);
                getProducts();
            } else {
                throw new Error('Ürün silinirken bir hata oluştu.');
            }
        } catch (error) {
            console.error('Ürün silinirken bir hata oluştu:', error);
        }finally{
            toast.success('Ürün Başarıyla Silindi!', {
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
    const [categories, setCategories] = useState<Categories[]>([]);
    const [category_id, setCategory_id] = useState<number>();
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>();
    const [explanation, setExplanation] = useState<string>('');
    const [base64image, setBase64Image] = useState<string>('');



    const handleForSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!name || !price || !explanation || !base64image || !category_id || !token) {
            console.error('Lütfen tüm alanları doldurun.');
            return;
        }
    
        const addData = {
            name: name,
            explanation: explanation,
            price: price,
            base64Image: base64image,
            categoryId: category_id,
            token: token,
        };
        const updateData = {
            id:productId,
            name: name,
            explanation: explanation,
            price: price,
            base64Image: base64image,
            categoryId: category_id,
            token: token,
        };
    
        try {
            let url = "https://pinsoft-project.onrender.com/api/products";
            let method = 'POST';
            let body = JSON.stringify(addData)
            if (productId !== 0) {
                url += `/${productId}`;
                method = 'PUT';
                body = JSON.stringify(updateData)
            }else{
                url = "https://pinsoft-project.onrender.com/api/products";
                method = 'POST';
                body = body
            }
    
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: body,
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
        } finally {
            setUpDelModal(false);
            getProducts();
            toast.success('Ürün Başarıyla Eklendi/Güncellendi!', {
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
    

    const newProductHandleClick = () =>{
        setUpDelModal(true);
        setProductId(0);
        setName("");
        setExplanation("");
        setPrice(0);
        setCategory_id(0);
        setBase64Image("");
    }
    const updateProductHandleClick =(id:number,name:string,explanation:string,price:number,categoryId:number,base64Image:string) =>{
        setUpDelModal(true);
        setProductId(id);
        setName(name);
        setExplanation(explanation);
        setPrice(price);
        setCategory_id(categoryId);
        setBase64Image(base64Image);
    }


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
        getProducts();
    }, []);
    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-center bg-9eb8d9 relative'>
            <ToastContainer />
            <AdminNavbar />
            <div className='w-[90%] mt-28  bg-white flex flex-col items-center relative'>
                <h3 className='w-full text-center my-10 text-2xl text-blue-900'>Products</h3>
                <div className='w-[90%] flex items-center justify-end'>
                    <button onClick={() => newProductHandleClick()} className='border-2 text-white bg-265073 py-2 px-4 rounded-3xl w-40'>New Product</button>
                    <button className='border-2 text-gray-300 py-2 px-4 rounded-3xl w-40'>Export To Excel/</button>
                </div>
                <table className='w-[90%]  border my-5'>
                    <thead className='bg-gray-200'>
                        <tr>
                            <th className='border border-gray-400'>Photo</th>
                            <th className='border border-gray-400'>Name</th>
                            <th className='border border-gray-400'>Explanation</th>
                            <th className='border border-gray-400'>Price(TL)</th>
                            <th className='border border-gray-400'>Category</th>
                            <th className='border border-gray-400'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className='text-center'>
                                <td className='border border-gray-400 flex justify-center p-2'><img src={product.base64Image} alt={product.name} className='w-20' /></td>
                                <td className='border border-gray-400'>{product.name}</td>
                                <td className='border border-gray-400'>{product.explanation}</td>
                                <td className='border border-gray-400'>{product.price}₺</td>
                                <td className='border border-gray-400'>{product.category.name}</td>
                                <td className='border border-gray-400'><div className='flex text-3xl items-center justify-center'><button onClick={() =>updateProductHandleClick(product.id,product.name,product.explanation,product.price,product.category.id,product.base64Image)}><MdEdit /></button><button onClick={() => handleClikModal(product.id)}><MdDelete /></button></div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {deleteModalOpen && (
                <div className='fixed w-full h-screen  top-0 z-40 bg-black bg-opacity-60 flex items-center justify-center'>
                    <div className='relative bg-white w-[30rem] h-72 rounded-2xl'>
                        <p className='ml-5 mt-10'>Are you sure you want to delete this product ?</p>
                        <div className='w-[90%] flex items-center justify-end absolute bottom-10 right-5'>
                            <button className='border-2 text-gray-300 py-2 px-4 rounded-3xl w-40 mr-2' onClick={() => handleClikModal(productId)}>Cancel</button>
                            <button className='border-2 text-white bg-265073 py-2 px-4 rounded-3xl w-40' onClick={() => handleDeleteProduct()}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
            {upDelModal && (
                <div className='fixed w-full h-screen  top-0 z-40 bg-black bg-opacity-60 flex items-center justify-center'>
                    <form className='w-[50rem] h-[40rem] bg-white rounded-3xl flex flex-col items-center relative' onSubmit={handleForSubmit}>
                        <button className='absolute top-2 right-2 text-4xl text-blue-900' onClick={() => setUpDelModal(false)}><MdOutlineCancel /></button>
                        {productId === 0 ?(
                            <h3 className='w-full text-center my-10 text-3xl text-blue-900 font-bold'>ADD PRODUCT</h3>
                        ):(
                            <h3 className='w-full text-center my-10 text-3xl text-blue-900 font-bold'>UPDATE PRODUCT</h3>
                        )}
                        <div className='relative w-[90%] h-20 flex items-center justify-between my-5'>
                            {name !== "" ?(
                                <input type="text" className='w-[20rem] h-1/2 border px-7 py-8 rounded-lg' placeholder='Product Name' value={name} onChange={(e) => setName(e.target.value)} />
                            ):(
                                <input type="text" className='w-[20rem] h-1/2 border px-7 py-8 rounded-lg' placeholder='Product Name' onChange={(e) => setName(e.target.value)} />
                            )}
                            {base64image !== "" ?(
                                <label htmlFor='file-input' className='relative w-[20rem] h-20 flex items-center justify-between my-5' >
                                <input
                                    id='file-input'
                                    type='file'
                                    className="file-input file-input-bordered file-input-md w-[20rem] h-5/6 max-w-xs rounded-lg file-input-ghost text-gray-400"
                                    onChange={(e) => handleFileChange(e)}
                                />
                            </label>
                            ):(
                                <label htmlFor='file-input' className='relative w-[20rem] h-20 flex items-center justify-between my-5' >
                                <input
                                    id='file-input'
                                    type='file'
                                    className="file-input file-input-bordered file-input-md w-[20rem] h-5/6 max-w-xs rounded-lg file-input-ghost text-gray-400"
                                    onChange={(e) => handleFileChange(e)}
                                />
                            </label>
                            )}
                        </div>
                        <div className='relative w-[90%] h-20 flex items-center justify-between my-5'>
                            {price !== 0 ?(
                                <input type="number" className='w-[20rem] h-1/2 border px-7 py-8 rounded-lg' placeholder='price' value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
                            ):(
                                <input type="number" className='w-[20rem] h-1/2 border px-7 py-8 rounded-lg' placeholder='price' onChange={(e) => setPrice(parseFloat(e.target.value))} />
                            )}
                            <select name="category" id="category" className='w-[20rem] h-1/2 border px-7 py-8 rounded-lg text-gray-400' onChange={(e) => setCategory_id(parseInt(e.target.value))}>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='relative w-[90%] h-40 flex items-center justify-between my-5'>
                           {explanation !== "" ?(
                             <input className='w-full max-h-full min-h-40 px-5 py-5 border  rounded-lg' placeholder='Write explanation here' value={explanation} onChange={(e) => setExplanation(e.target.value)} />
                           ):(
                            <input className='w-full max-h-full min-h-40 px-5 py-5 border  rounded-lg' placeholder='Write explanation here' onChange={(e) => setExplanation(e.target.value)} />
                           )}
                        </div>
                        {productId !== 0 ?(
                            <input type='submit' className='bg-265073 w-3/4 h-16 text-white text-center text-3xl font-semibold rounded-xl my-5' value={'SAVE'} />
                        ):(
                            <input type='submit'  className='bg-265073 w-3/4 h-16 text-white text-center text-3xl font-semibold rounded-xl my-5' value={'ADD'} />
                        )}
                    </form>
                </div>
            )}
        </div>
    )
}

export default page
