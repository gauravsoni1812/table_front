/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import img1 from '../../../images/left_arrow.svg';
import img2 from '../../../images/subcategory.svg';
import Uploader from '../imageUploader';
import axios from 'axios';

const EditSubCategory = ({ cdata, data, change }) => {

    
    const [category, setCategory] = useState(data.categoryId);
    const [subcategoryName, setSubCategoryName] = useState(data.Subcategory_name);
    const [sequence, setSequence] = useState(data.Sequence);
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState(data.Status); // Added for status

    console.log(data)
    console.log(sequence)

    const handleFile = (data) => {
        setFile(data);
    };

    const handleClick = async () => {
        const token = localStorage.getItem('authToken'); // Get the token from localStorage
        // Create a FormData object and append the necessary fields
        const formData = new FormData();

        formData.append('Subcategory_name', subcategoryName);
        formData.append('Sequence', sequence);
        formData.append('CategoryId', category); // Corrected key name (removed extra space)
        formData.append('Image', file);
    

        try {
            const response = await axios.patch(
                `https://table-t0az.onrender.com/category/${data.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`, // Pass the token in the headers
                    },
                }
            );
            console.log('Subcategory edited successfully:', response.data);
    
            change();
        } catch (error) {
            console.error('Error editing subcategory:', error);
        }
    };

    return (
        <div className='shadow-lg p-3 m-2 my-0 h-full flex flex-col justify-between'>
            <div>
                <div className='flex justify-start gap-3 items-center p-3'>
                    <img
                        src={img1}
                        className='cursor-pointer'
                        alt=''
                        onClick={() => {
                            change();
                        }}
                    />
                    <h2 className='font-semibold text-[20px] flex justify-center items-center gap-1'>
                        <span className='mx-2'>
                            <img src={img2} alt='' />
                        </span>{' '}
                        <span> Edit Subcategory </span>
                    </h2>
                </div>

                <div className='flex gap-10'>
                    {/* Category select */}
                    <div className='flex flex-col w-[317px]'>
                        <label className='w-[80px] text-center bg-white relative top-3 left-4'>
                            Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)} // Update category value on change
                            className='border-[1px] border-[#868686] p-3 rounded-lg text-sm text-[#868686]'
                        >
                            <option value=''>Select a category</option>
                            {cdata &&
                                cdata.map((cat, i) => (
                                    <option key={i} value={cat.id}>
                                        {cat.Category_name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Subcategory Name */}
                    <div className='flex flex-col w-[317px]'>
                        <label
                            htmlFor='subcategory'
                            className='w-[170px] text-center bg-white relative top-3 left-4'
                        >
                            Subcategory name
                        </label>
                        <input
                            value={subcategoryName}
                            onChange={(e) => setSubCategoryName(e.target.value)} // Update subcategory name on change
                            id='subcategory'
                            type='text'
                            className='border-[1px] border-[#868686] p-2 rounded-lg'
                        />
                    </div>

                    {/* Subcategory Sequence */}
                    <div className='flex flex-col w-[317px]'>
                        <label
                            htmlFor='subcategory-sequence'
                            className='w-[170px] text-center bg-white relative top-3 left-4'
                        >
                            Subcategory sequence
                        </label>
                        <input
                            value={sequence}
                            onChange={(e) => setSequence(e.target.value)} // Update sequence on change
                            id='subcategory-sequence'
                            type='number'
                            className='border-[1px] border-[#868686] p-2 rounded-lg'
                        />
                    </div>
                </div>

                <div className='flex gap-10 my-5'>
                    {/* Status */}
                    <div className='flex flex-col w-[317px]'>
                        <label className='w-[70px] text-center bg-white relative top-3 left-4'>
                            Status
                        </label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)} // Update status on change
                            className='border-[1px] border-[#868686] p-2.5 rounded-lg'
                        >
                            <option value=''>Select status</option>
                            <option value={false}>Inactive</option>
                            <option value={true}>Active</option>
                        </select>
                    </div>

                    <div>
                        <Uploader handlefileSubcategory={handleFile} />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className='my-5 flex justify-end items-center gap-5 mx-3'>
                <button
                    onClick={() => {
                        change();
                    }}
                    className='rounded-[30px] p-3 border-[1px] border-[#9d9d9d] px-12'
                >
                    Cancel
                </button>

                <button
                    onClick={handleClick}
                    className='rounded-[30px] p-3 border-[1px] bg-[#662671] px-12 text-white'
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditSubCategory;
