/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import img1 from "../../images/delete_2.svg"
import axios from 'axios'

const Modal = ({ id_product , id_subcategory, id_category, onclose }) => {

    const handleDelete = async () => {
        const token = localStorage.getItem('authToken');

        if (id_category !== null) {

            try {
                const response = await axios.delete(`https://table-t0az.onrender.com/category/${id_category}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                console.log(response.data);
                onclose();
                // show popup
            } catch (error) {
                console.log(error)
            }
        }

        if (id_subcategory !== null) {

            try {
                const response = await axios.delete(`https://table-t0az.onrender.com/subcategory/${id_subcategory}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                console.log(response.data);
                onclose();
                // show popup
            } catch (error) {
                console.log(error)
            }
        }
        if (id_product !== null) {
    
            try {
                const response = await axios.delete(`https://table-t0az.onrender.com/product/${id_product}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                console.log(response.data);
                onclose();
                // show popup
            } catch (error) {
                console.log(error)
            }
        }
    }
   



    return (
        <div className='modal text-[#8f8f8f]'>
            <div className='flex justify-center items-center h-screen'>
                <div className='p-5 bg-white flex flex-col items-center justify-center'>

                    <div className='flex gap-3 justify-center items-center'>
                        <img src={img1} alt="" />
                        <p className='text-[24px] font-semibold'>Delete</p>
                    </div>
                    <p>Are you sure you want to delete?</p>

                    <div className='my-5 flex justify-end items-center gap-5 mx-3'>
                        <button onClick={() => {
                            onclose()
                        }} className='rounded-[30px] p-3 border-[1px] border-[#9d9d9d] px-12'>cancel</button>

                        <button onClick={() => {
                            handleDelete()
                        }} className='rounded-[30px] p-3 border-[1px] bg-[#662671] px-12 text-white'>delete</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Modal