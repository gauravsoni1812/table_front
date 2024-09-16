/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import img1 from '../../../images/left_arrow.svg';
import img2 from '../../../images/products.svg';
import Uploader from '../imageUploader';
import axios from 'axios';

const EditProduct = ({ data, change, category, subcategory }) => {
    const [productName, setProductName] = useState(data.Product_name);
    const [categoryId, setCategoryId] = useState(data.Subcategory?.categoryId || '');
    const [subCategoryId, setSubCategoryId] = useState(data.Subcategory_id || '');
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState(data.Status);
    
    // Handle file selection from Uploader component
    const handleFile = (data) => {
        setFile(data);
    };

    // Handle the form submission
    const handleClick = async () => {
        const token = localStorage.getItem('authToken'); // Get the token from localStorage
        const formData = new FormData();

        formData.append('Product_name', productName);
        formData.append('Subcategory_id', subCategoryId);
        formData.append('Image', file);
        formData.append('status', status);

        try {
            const response = await axios.patch(
                `https://table-t0az.onrender.com/product/${data.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`, // Pass the token in the headers
                    },
                }
            );
            console.log('Product edited successfully:', response.data);
            change();
        } catch (error) {
            console.error('Error editing product:', error);
        }
    };
       
    console.log(subcategory)
    // Filter subcategories based on the selected category
    const filteredSubcategories = subcategory.filter(sub => sub.categoryId === categoryId);

    return (
        <div className='shadow-lg p-3 m-2 my-0 h-full flex flex-col justify-between'>
            <div>
                <div className='flex justify-start gap-3 items-center p-3'>
                    <img src={img1} className='cursor-pointer' alt="" onClick={change} />
                    <h2 className='font-semibold text-[20px] flex justify-center items-center gap-1'>
                        <span className='mx-2'><img src={img2} alt="" /></span>
                        <span>Edit Product</span>
                    </h2>
                </div>

                <div className='flex gap-10'>
                    {/* Category Selection */}
                    <div className='flex flex-col w-[317px]'>
                        <label htmlFor="" className='w-[80px] text-center bg-white relative top-3 left-4'>Category</label>
                        <select
                            value={categoryId}
                            onChange={e => setCategoryId(e.target.value)}
                            className='border-[1px] border-[#868686] p-2.5 rounded-lg'
                        >
                            <option value=''>Select a category</option>
                            {category && category.map((cat, i) => (
                                <option key={i} value={cat.id}>
                                    {cat.Category_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Subcategory Selection */}
                    <div className='flex flex-col w-[317px]'>
                        <label htmlFor="" className='w-[100px] text-center bg-white relative top-3 left-4'>Subcategory</label>
                        <select
                            value={subCategoryId}
                            onChange={e => setSubCategoryId(e.target.value)}
                            className='border-[1px] border-[#868686] p-2.5 rounded-lg'
                        >
                            <option>Select a subcategory</option>
                            {filteredSubcategories.length > 0 ? (
                                filteredSubcategories.map((sub, i) => (
                                    <option key={i} value={sub.id}>
                                        {sub.Subcategory_name}
                                    </option>
                                ))
                            ) : (
                                <option>No subcategories available</option>
                            )}
                        </select>
                    </div>

                    {/* Product Name Input */}
                    <div className='flex flex-col w-[317px]'>
                        <label htmlFor="productName" className='w-[110px] text-center bg-white relative top-3 left-4'>Product name</label>
                        <input
                            value={productName}
                            onChange={e => setProductName(e.target.value)}
                            id="productName"
                            type="text"
                            className='border-[1px] border-[#868686] p-2 rounded-lg'
                        />
                    </div>
                </div>

                <div className='flex gap-10 my-5'>
                    {/* Status Selection */}
                    <div className='flex flex-col w-[317px]'>
                        <label htmlFor="" className='w-[70px] text-center bg-white relative top-3 left-4'>Status</label>
                        <select
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            className='border-[1px] border-[#868686] p-2.5 rounded-lg'
                        >
                            <option value=""></option>
                            <option value={false}>pending</option>
                            <option value={true}>active</option>
                        </select>
                    </div>

                    {/* Image Uploader */}
                    <div>
                        <Uploader handlefileProduct={handleFile} />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className='my-5 flex justify-end items-center gap-5 mx-3'>
                <button onClick={change} className='rounded-[30px] p-3 border-[1px] border-[#9d9d9d] px-12'>
                    cancel
                </button>

                <button onClick={handleClick} className='rounded-[30px] p-3 border-[1px] bg-[#662671] px-12 text-white'>
                    save
                </button>
            </div>
        </div>
    );
};

export default EditProduct;
