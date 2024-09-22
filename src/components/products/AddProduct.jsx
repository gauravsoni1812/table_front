/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import img1 from '../../../images/left_arrow.svg';
import Uploader from '../imageUploader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProduct = ({ category, subcategory, change }) => {
    const [categoryId, setCategoryId] = useState(null);
    const [subcategoryId, setSubCategoryId] = useState(null);
    const [productName, setProductName] = useState(null);
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleFile = (data) => {
        setFile(data);
    };

    console.log(filteredSubcategories)

    const handleClick = async () => {
        const token = localStorage.getItem('authToken'); // Get the token from localStorage
        if (!productName || !file || !subcategoryId) {
            console.error('All fields are required.');
            return;
        }

        // Create a FormData object and append the necessary fields
        const formData = new FormData();

        formData.append('Product_name', productName);
        formData.append('Subcategory_id', subcategoryId);
        formData.append('Image', file);

        try {
            const response = await axios.post(
                'https://table-t0az.onrender.com/product',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`, // Pass the token in the headers
                    },
                }
            );
            console.log('product added successfully:', response.data);
 
            console.log
            change()
        } catch (error) {
            console.error('Error adding products', error);
        }
    };

    // Filter subcategories based on the selected category
    useEffect(() => {
        if (categoryId) {
            const filtered = subcategory.filter(
                (sub) => sub.categoryId === Number(categoryId) // Convert categoryId to number
            );
            setFilteredSubcategories(filtered);
        } else {
            setFilteredSubcategories(subcategory); // Show all subcategories if no category is selected
        }
    }, [categoryId, subcategory]);

    return (
        <div className="shadow-lg p-3 m-2 my-0 h-full flex flex-col justify-between">
            <div className="flex flex-col gap-6">
                <div>
                    <div className="flex justify-start gap-3 items-center p-3">
                        <img
                            src={img1}
                            className="cursor-pointer"
                            alt=""
                            onClick={() => {
                                change();
                            }}
                        />
                        <h2 className="font-semibold text-[20px]">Add Products</h2>
                    </div>

                    <div className="flex gap-10">
                        <div className="flex flex-col w-[317px]">
                            <label htmlFor="" className="w-[120px] text-center bg-white relative top-3 left-4">
                                Category
                            </label>
                            <select
                                onChange={(e) => setCategoryId(e.target.value)}
                                className="border-[1px] border-[#868686] p-2 rounded-lg"
                            >
                                <option value="">Select a category</option>
                                {category && category.map((category, i) => (
                                    <option key={i} className="py-2 hover:bg-gray-200" value={category.id}>
                                        {category.Category_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col w-[317px]">
                            <label htmlFor="" className="w-[150px] text-center bg-white relative top-3 left-4">
                                Subcategory
                            </label>
                            <select
                                onChange={(e) => setSubCategoryId(e.target.value)}
                                className="border-[1px] border-[#868686] p-2 rounded-lg"
                            >
                                <option value="">Select a subcategory</option>
                                {filteredSubcategories.map((sub, i) => (
                                    <option key={i} className="py-2 hover:bg-gray-200" value={sub.id}>
                                        {sub.Subcategory_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col w-[317px]">
                            <label htmlFor="" className="w-[120px] text-center bg-white relative top-3 left-4">
                                Product name
                            </label>
                            <input
                                onChange={(e) => setProductName(e.target.value)}
                                type="text"
                                className="border-[1px] border-[#868686] p-2 rounded-lg"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <Uploader handleFile={null} handlefileSubcategory={null} handlefileProduct={handleFile} />
                </div>
            </div>

            <div className="my-5 flex justify-end items-center gap-5 mx-3">
                <button className="rounded-[30px] p-3 border-[1px] border-[#9d9d9d] px-12">Cancel</button>
                <button onClick={handleClick} className="rounded-[30px] p-3 border-[1px] bg-[#662671] px-12 text-white">Save</button>
            </div>
        </div>
    );
};

export default AddProduct;
