/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import img1 from '../../../images/left_arrow.svg';
import Uploader from '../imageUploader';
import axios from 'axios';

const EditCategory = ({ data, change }) => {
    console.log(data);

    const [categoryName, setCategoryName] = useState(data.Category_name);
    const [sequence, setSequence] = useState(data.Sequence);
    const [file, setFile] = useState(null);
    const [active, setActive] = useState('inactive')
    const handleFile = (data) => {
        setFile(data);
    };

    const handleClick = async () => {
        const token = localStorage.getItem('authToken'); // Get the token from localStorage
        // Create a FormData object and append the necessary fields
        const formData = new FormData();
        formData.append('Category_name', categoryName);
        formData.append('Sequence', sequence);
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
            console.log('Category edited  successfully:', response.data);
            change()
        } catch (error) {
            console.error('Error adding category:', error);
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
                    <h2 className='font-semibold text-[20px]'>Edit Category</h2>
                </div>

                <div className='flex gap-10'>
                    <div className='flex flex-col w-[317px]'>
                        <label
                            htmlFor=''
                            className='w-[69px] text-center bg-white relative top-3 left-4'
                        >
                            Category Name
                        </label>
                        {/* Add the onChange handler to update categoryName */}
                        <input
                            type='text'
                            className='border-[1px] border-[#868686] p-2 rounded-lg'
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)} // Update categoryName state on change
                        />
                    </div>

                    <div className='flex flex-col w-[317px]'>
                        <label className='w-[150px] text-center bg-white relative top-3 left-4'>
                            Category sequence
                        </label>
                        <input
                            value={sequence}
                            onChange={(e) => setSequence(e.target.value)} // Update sequence state on change
                            type='number'
                            className='border-[1px] border-[#868686] p-2 rounded-lg'
                        />
                    </div>

                    <div className='flex flex-col w-[317px]'>
                        <label
                            htmlFor=''
                            className='w-[150px] text-center bg-white relative top-3 left-4'
                        >
                            Status
                        </label>
                        <select
                            value={active}
                            onChange={e => setActive(e.target.value)}
                            className='border-[1px] border-[#868686] p-2 rounded-lg'
                        >
                            <option value='active'>Active</option>
                            <option value='inactive'>Inactive</option>
                        </select>
                    </div>
                </div>

                <div>
                    <Uploader handleFile={handleFile} />
                </div>
            </div>

            <div className='my-5 flex justify-end items-center gap-5 mx-3'>
                <button
                    onClick={() => {
                        change();
                    }}
                    className='rounded-[30px] p-3 border-[1px] border-[#9d9d9d] px-12'
                >
                    cancel
                </button>

                <button
                    onClick={handleClick}
                    className='rounded-[30px] p-3 border-[1px] bg-[#662671] px-12 text-white'
                >
                    save
                </button>
            </div>
        </div>
    );
};

export default EditCategory;
