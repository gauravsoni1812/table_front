/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import img2 from "../../images/logo.svg"
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

const Dashboard = () => {

    const navigate = useNavigate()
    useEffect(() => {
        const userIdentify = () => {
            const token = localStorage.getItem("authToken");
            console.log(token)
            if (token) {
                try {
                    // Decode the token to get the user details
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken.id; // Adjust the key based on your token's payload
                     
                    console.log(decodedToken)
                    if (!userId) {
                        navigate("/sign-in");
                    }
                } catch (error) {
                    console.log("Invalid token:", error);
                    navigate("/sign-in"); // If token is invalid, redirect to sign-in
                }
            } else {
                console.log("herer")
                navigate("/sign-in"); // No token found, redirect to sign-in
            }
        };

        userIdentify(); // Call the function to check user identity
    }, [navigate]);


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