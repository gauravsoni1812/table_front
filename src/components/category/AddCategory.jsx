/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import img1 from '../../../images/left_arrow.svg';
import Uploader from '../imageUploader';
import axios from 'axios';

const AddCategory = ({ change }) => {
    const [Category_name, setCategory_name] = useState('');
    const [Sequence, setSequence] = useState('');
    const [file, setFile] = useState(null);

    // Function to handle the file from Uploader component
    const handleFile = (file) => {
        setFile(file);
    };

    // Function to handle form submission
    const handleClick = async () => {
        const token = localStorage.getItem('authToken'); // Get the token from localStorage
        if (!Category_name || !Sequence || !file) {
            console.error('All fields are required.');
            return;
        }

        // Create a FormData object and append the necessary fields
        const formData = new FormData();
        formData.append('Category_name', Category_name);
        formData.append('Sequence', Sequence);
        formData.append('Image', file);

        try {
            const response = await axios.post(
                'https://table-t0az.onrender.com/category',
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
            setCategory_name('');
            setSequence('');
            setFile(null);
            change()

        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    // Function to handle the cancel button
    const handleCancel = () => {
        // Clear the form fields
        setCategory_name('');
        setSequence('');
        setFile(null);
    };

    return (
        <div className='shadow-lg p-3 m-2 my-0 h-full flex flex-col justify-between'>
            <div className='flex flex-col gap-6'>
                <div>
                    <div className='flex justify-start gap-3 items-center p-3'>
                        <img
                            src={img1}
                            className='cursor-pointer'
                            alt="back"
                            onClick={() => change()}
                        />
                        <h2 className='font-semibold text-[20px]'>Add Category</h2>
                    </div>

                    <div className='flex gap-10'>
                        <div className='flex flex-col w-[317px]'>
                            <label className='w-[150px] text-center bg-white relative top-3 left-4'>
                                Category name
                            </label>
                            <input
                                type="text"
                                className='border-[1px] border-[#868686] p-2 rounded-lg'
                                value={Category_name}
                                onChange={(e) => setCategory_name(e.target.value)}
                            />
                        </div>

                        <div className='flex flex-col w-[317px]'>
                            <label className='w-[170px] text-center bg-white relative top-3 left-4'>
                                Category sequence
                            </label>
                            <input
                                type="number"
                                className='border-[1px] border-[#868686] p-2 rounded-lg'
                                value={Sequence}
                                onChange={(e) => setSequence(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <Uploader handleFile={handleFile} />
                </div>
            </div>
            <div className='my-5 flex justify-end items-center gap-5 mx-3'>
                <button
                    onClick={handleCancel}
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

export default AddCategory;
