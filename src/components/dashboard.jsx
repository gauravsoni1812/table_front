/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import img2 from "../../images/logo.svg"

const Dashboard = () => {
   
    return (
        <div>
            <Navbar />
            <div className='flex relative top-[60px]'>
                <div className='hidden md:block md:w-[20%]'>
                    <Sidebar name="dashboard" />
                </div>

                <div className='md:w-[80%] flex justify-center items-center'>
                    <div>
                        <div className='flex flex-col gap-6 justify-center items-center'>
                            <div>
                                <img src={img2} className='h-[80px]' alt="" />
                                <p className='text-[20px]'>Welcome to TableSprint admin</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard