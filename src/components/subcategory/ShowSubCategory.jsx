/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import img1 from "../../../images/subcategory.svg"
import img2 from "../../../images/search.svg"
import img3 from "../../../images/upward_arrow.svg"
import img4 from "../../../images/edit.svg"
import img5 from "../../../images/delete.svg"
import axios from 'axios'
import Modal from '../Modal'

const ShowSubCategory = ({ feditId, change, changeEdit }) => {

    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        const getAllCategories = async () => {
            // Retrieve token from local storage
            console.log("gaurav soni")
            const token = localStorage.getItem("authToken");
            console.log(token)
            try {
                const response = await axios.get("https://table-t0az.onrender.com/subcategory", {
                    headers: {
                        Authorization: `Bearer ${token}` // Pass token in Authorization header
                    }
                });
                setData(response.data.data)
                console.log(response.data); // Handle the response
            } catch (error) {
                console.log("Error fetching categories:", error);
            }
        };

        getAllCategories();
    }, []);
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const [id, setId] = useState(null)
    const itemsPerPage = 6; // Number of items per page

    const close = () => {
        setShowModal(false);
    };

    // Pagination logic
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage(prevPage => (prevPage < totalPages ? prevPage + 1 : prevPage));
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage));
    };

    return (
        <div>
            <div>
                <div className='flex justify-between p-5 items-center px-8'>
                    <div className='flex justify-center items-center gap-4'>
                        <img src={img1} alt="" />
                        <h2 className='font-semibold text-[25px]'>SubCateory</h2>
                    </div>

                    <div className='relative'>
                        <input type='text' className="w-[400px] border-[1px] border-[#9D9D9D] p-1 rounded-lg" />
                        <img src={img2} alt="" className='absolute top-1 left-[370px] ' />
                    </div>

                    <div>
                        <button onClick={() => {
                            change()
                        }} className='px-4 py-3 bg-[#662671] text-white rounded-lg'>Add Subcategory</button>
                    </div>

                </div>
                <div className="flex flex-col p-2">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 border-separate" style={{ borderSpacing: '0 15px' }}>
                                    <thead className="bg-[#FFF8B7] my-2 text-center border-t-[10px] border-b-[10px] border-black">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-center">
                                                <div className="flex justify-center items-center gap-3">
                                                    <p className='text-[20px] font-normal'>Id</p>
                                                    <img src={img3} alt="" />
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-center">
                                                <div className="flex justify-center items-center gap-3">
                                                    <p className='text-[20px] font-normal'>SubCategory name</p>
                                                    <img src={img3} alt="" />
                                                </div>
                                            </th>

                                            <th scope="col" className="px-6 py-3 text-center">
                                                <div className="flex justify-center items-center gap-3">
                                                    <p className='text-[20px] font-normal'>Category name</p>
                                                    <img src={img3} alt="" />
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-center">
                                                <div className="flex justify-center items-center gap-3">
                                                    <p className='text-[20px] font-normal'>Image</p>
                                                    <img src={img3} alt="" />
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-center">
                                                <div className="flex justify-center items-center gap-3">
                                                    <p className='text-[20px] font-normal'>Status</p>
                                                    <img src={img3} alt="" />
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-center">
                                                <div className="flex justify-center items-center gap-3">
                                                    <p className='text-[20px] font-normal'>Sequence</p>
                                                    <img src={img3} alt="" />
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-center">
                                                <div className="flex justify-center items-center gap-3">
                                                    <p className='text-[20px] font-normal'>Action</p>
                                                    <img src={img3} alt="" />
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>


                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentItems.map((person,i) => (
                                            <tr key={i} className="border-black border-t-[10px] border-b-[10px] bg-[#f2f2f2]">
                                                <td className="px-6 py-2 whitespace-nowrap text-center">
                                                 {person.id}
                                                </td>
                                                <td className="px-6 py-2 whitespace-nowrap text-center">
                                                    {person.Subcategory_name}
                                                </td>
                                                <td className="px-6 py-2 whitespace-nowrap text-center">
                                                    {person.Category.Category_name}
                                                </td>
                                                <td className="px-6 py-3 whitespace-nowrap text-center flex justify-center">
                                                    <img className='h-12' src={`https://table-t0az.onrender.com/${person.Image}`} alt="" />
                                                </td>
                                                <td className="px-6 py-3 whitespace-nowrap text-sm   text-center">
                                                    {person.Status?"Active":"Inactive"}
                                                </td>
                                                <td className="px-6 py-3 whitespace-nowrap text-sm text-center">
                                                    {`${person.Sequence}`}
                                                </td>
                                                <td className="px-6 py-3 text-center">
                                                    <div className='flex gap-3 justify-center items-center'>
                                                        <img src={img4} alt="" className='cursor-pointer' onClick={() => {
                                                            feditId(person)
                                                            changeEdit()
                                                        }} />
                                                        <img onClick={() => {
                                                            setId(person.id)
                                                            setShowModal(true)
                                                        }} src={img5} alt="" className='cursor-pointer' />
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
            </div>
            {showModal && <Modal id_subcategory={id} onclose={close} />}
        </div>
    )
}

export default ShowSubCategory