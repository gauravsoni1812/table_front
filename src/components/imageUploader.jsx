/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import img from "../../images/image.svg"
const Uploader = ({ handleFile , handlefileSubcategory , handlefileProduct }) => {
    const handleClick = (e) => {

        if(handleFile){
            handleFile(e.target.files[0])
        }

        if(handlefileSubcategory){
            handlefileSubcategory(e.target.files[0])
        }
        
        if(handlefileProduct){
            handlefileProduct(e.target.files[0])
        }

    }
    return (
        <div className='flex gap-9 justify-start items-center'>
            <div className="bg-white p-3 rounded-2xl flex gap-5" onClick={() => {
                document.querySelector(".input-field1").click()
            }}>
                <form action="" className="flex flex-col justify-center items-center border-[1px] border-dashed border-[#474747] } h-[200px] md:h-[123px] w-[143px] md:w-[143px] cursor-pointer rounded-lg p-2">
                    <input className='input-field1' hidden type="file" accept='.png' onChange={handleClick} />
                    <div className='flex flex-col justify-center items-center text-[#999CAD] gap-3'>
                        <img src={img} alt="" className='h-[36px] w-[36px]' />
                        <p className='text-[12px] text-black text-center'>Upload maximum allowed size is 10 MB </p>
                    </div>
                </form>
            </div>
            <div>
                <div className='flex flex-col w-[200px]'>
                    <p className='w-[90px] text-center bg-white relative top-3 left-4'>Upload img</p>
                    <div className='border-[1px] border-[#868686] p-2 h-[123px] w-[143px] rounded-lg'>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Uploader