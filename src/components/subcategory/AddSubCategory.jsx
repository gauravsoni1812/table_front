/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import img1 from "../../../images/left_arrow.svg";
import Uploader from '../imageUploader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddSubCategory = ({ data, change }) => {
    const [category, setCategory] = useState(null)
    const [subcategory, setSubCategory] = useState(null)
    const [Sequence, setSequence] = useState(null)
    const [file, setFile] = useState(null)
    const navigate = useNavigate()
    const handleFile = (data) => {
        setFile(data)
    }
    console.log(category,subcategory, Sequence , file)

    const handleClick = async () => {
        const token = localStorage.getItem('authToken'); // Get the token from localStorage
        if (!category || !Sequence || !file || !subcategory) {
            console.error('All fields are required.');
            return;
        }

        // Create a FormData object and append the necessary fields
        const formData = new FormData();
        formData.append('CategoryId', category);
        formData.append('Subcategory_name', subcategory);
        formData.append('Sequence', Sequence);
        formData.append('Image', file);

        try {
            const response = await axios.post(
                'https://table-t0az.onrender.com/subcategory',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`, // Pass the token in the headers
                    },
                }
            );
            console.log('Category added successfully:', response.data);

            // Clear the form after successful submission
            // setCategory_name('');
            // subcategory('')
            // setSequence('');
            // setFile(null);
            navigate('/subcategory')
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    return (
        <div className='shadow-lg p-3 m-2 my-0 h-full flex flex-col justify-between'>
            <div className='flex flex-col gap-6'>
                <div>
                    <div className='flex justify-start gap-3 items-center p-3'>
                        <img src={img1} className='cursor-pointer' alt="back" onClick={change} />
                        <h2 className='font-semibold text-[20px]'>Add Subcategory</h2>
                    </div>

                    <div className='flex gap-10'>
                        {/* Category Dropdown */}
                        <div className='flex flex-col w-[317px]'>
                            <label htmlFor="category" className='w-[80px] text-center bg-white relative top-3 left-4'>Category</label>
                            <select onChange={(e) => {
                                setCategory(e.target.value)
                            }} id="category" className='border-[1px] border-[#868686] p-3 rounded-lg text-sm text-[#868686]'>
                                <option value="">Select a category</option>
                                {data.map((category, i) => (
                                    <option key={i} className='py-2 hover:bg-gray-200' value={`${category.id}`}>{category.Category_name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Subcategory Input */}
                        <div className='flex flex-col w-[317px]'>
                            <label htmlFor="subcategory" className='w-[170px] text-center bg-white relative top-3 left-4'>Subcategory name</label>
                            <input onChange={(e) => {
                                setSubCategory(e.target.value)
                            }} id="subcategory" type="text" className='border-[1px] border-[#868686] p-2 rounded-lg' />
                        </div>

                        {/* Category Subsequence Input */}
                        <div className='flex flex-col w-[317px]'>
                            <label htmlFor="subsequence" className='w-[190px] text-center bg-white relative top-3 left-4'>Category subsequence</label>
                            <input onChange={(e) => {
                                setSequence(e.target.value)
                            }} id="subsequence" type="number" className='border-[1px] border-[#868686] p-2 rounded-lg' />
                        </div>
 
                    </div>
                </div>

                {/* Uploader Component */}
                <div>
                    <Uploader handleFile={null} handlefileSubcategory={handleFile} handlefileProduct={null} />
                </div>
            </div>

            {/* Buttons */}
            <div className='my-5 flex justify-end items-center gap-5 mx-3'>
                <button onClick={()=>{
                    change()
                }} className='rounded-[30px] p-3 border-[1px] border-[#9d9d9d] px-12'>Cancel</button>
                <button onClick={() => {
                    handleClick()
                }} className='rounded-[30px] p-3 bg-[#662671] text-white px-12'>Save</button>
            </div>
        </div>
    );
}

export default AddSubCategory;
