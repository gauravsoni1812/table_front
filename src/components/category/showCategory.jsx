/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'

import img1 from "../../../images/category.svg"
import img2 from "../../../images/search.svg"
import img3 from "../../../images/upward_arrow.svg"
import img4 from "../../../images/edit.svg"
import img5 from "../../../images/delete.svg"
import Modal from '../Modal'
import axios from 'axios'

const ShowCategory = ({ fiddata, change, changeEdit }) => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [query, setQuery] = useState(""); // Add state for search query

    useEffect(() => {
        const getAllCategories = async () => {
            console.log("Fetching categories");
            const token = localStorage.getItem("authToken");
            try {
                const response = await axios.get("https://table-t0az.onrender.com/category", {
                    headers: {
                        Authorization: `Bearer ${token}` // Pass token in Authorization header
                    }
                });
                setData(response.data.data);
            } catch (error) {
                console.log("Error fetching categories:", error);
            }
        };

        getAllCategories();
    }, [showModal]);

    const [currentPage, setCurrentPage] = useState(1);
    const [id, setId] = useState(null);
    const itemsPerPage = 6;

    const close = () => {
        setShowModal(false);
    };

    // Filter data based on search query
    const filteredData = data.filter((category) => 
        category.Category_name.toLowerCase().includes(query.toLowerCase())
    );

    // Pagination logic
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage(prevPage => (prevPage < totalPages ? prevPage + 1 : prevPage));
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage));
    };

    return (
        <div>
            <div className='flex md:flex-row flex-col gap-3 md:gap-0 justify-between p-5 items-center px-8'>
                <div className='hidden md:flex justify-center items-center gap-4'>
                    <img src={img1} alt="category icon" />
                    <h2 className='font-semibold text-[25px]'>Category</h2>
                </div>

                <div className='relative'>
                    <input 
                        type='text' 
                        className="w-[400px] border-[1px] border-[#9D9D9D] p-1 rounded-lg" 
                        placeholder="Search category..."
                        onChange={(e) => setQuery(e.target.value)} // Update query state
                    />
                    <img src={img2} alt="search icon" className='absolute top-1 left-[370px]' />
                </div>

                <div>
                    <button onClick={() => change()} className='px-2 py-3 bg-[#662671] text-white rounded-lg'>
                        Add Category
                    </button>
                </div>
            </div>

            <div className="flex flex-col p-2">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-x-auto border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 border-separate" style={{ borderSpacing: '0 15px' }}>
                                <thead className="bg-[#FFF8B7] my-2 text-center border-t-[10px] border-b-[10px] border-black">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            <div className="flex justify-center items-center gap-3">
                                                <p className='text-[20px] font-normal'>Id</p>
                                                <img src={img3} alt="arrow icon" />
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            <div className="flex justify-center items-center gap-3">
                                                <p className='text-[20px] font-normal'>Category name</p>
                                                <img src={img3} alt="arrow icon" />
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            <div className="flex justify-center items-center gap-3">
                                                <p className='text-[20px] font-normal'>Image</p>
                                                <img src={img3} alt="arrow icon" />
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            <div className="flex justify-center items-center gap-3">
                                                <p className='text-[20px] font-normal'>Status</p>
                                                <img src={img3} alt="arrow icon" />
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            <div className="flex justify-center items-center gap-3">
                                                <p className='text-[20px] font-normal'>Sequence</p>
                                                <img src={img3} alt="arrow icon" />
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-center">
                                            <div className="flex justify-center items-center gap-3">
                                                <p className='text-[20px] font-normal'>Action</p>
                                                <img src={img3} alt="arrow icon" />
                                            </div>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentItems.map((person, index) => (
                                        <tr key={index} className="border-black border-t-[10px] border-b-[10px] bg-[#f2f2f2]">
                                            <td className="px-6 py-2 whitespace-nowrap text-center">
                                                {person.id}
                                            </td>
                                            <td className="px-6 py-2 whitespace-nowrap text-center">
                                                {person.Category_name}
                                            </td>
                                            <td className="px-6 py-3 whitespace-nowrap text-center flex justify-center">
                                                <img src={`https://table-t0az.onrender.com/${person.Image}`} className='h-8' alt="category" />
                                            </td>
                                            <td className="px-6 py-3 whitespace-nowrap text-sm text-center">
                                                {person.status ? "inactive" : "active"}
                                            </td>
                                            <td className="px-6 py-3 whitespace-nowrap text-sm text-center">
                                                {person.Sequence}
                                            </td>
                                            <td className="px-6 py-3 text-center">
                                                <div className='flex gap-3 justify-center items-center'>
                                                    <img src={img4} alt="edit icon" className='cursor-pointer' onClick={() => { 
                                                        fiddata(person)
                                                        changeEdit()
                                                    }} />
                                                    <img onClick={() => {
                                                        setId(person.id)
                                                        setShowModal(true)
                                                    }} src={img5} alt="delete icon" className='cursor-pointer' />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="flex justify-between items-center p-4">
                                <button 
                                    onClick={handlePrevPage} 
                                    disabled={currentPage === 1} 
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:bg-gray-200 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <span>
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button 
                                    onClick={handleNextPage} 
                                    disabled={currentPage === totalPages} 
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:bg-gray-200 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && <Modal id_category={id} onclose={close} />}
        </div>
    )
}

export default ShowCategory;
