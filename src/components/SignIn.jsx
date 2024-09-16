/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import img1 from "../../images/image_5.svg"
import img2 from "../../images/logo.svg"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const SignIn = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState(null)
    const [password, setpassword] = useState(null)
    const onSubmit = async () => {
        console.log("asdasd")
        try {
            const data = await axios.post("https://table-t0az.onrender.com/signin", { email, password })
            const token = data.data.token
            localStorage.setItem("authToken", token);
            navigate("/dashboard")
            console.log("Token saved to localStorage");
        } catch (error) {
            console.log(error)
        }

    }
  
    return (
        <div className='signIn relative flex justify-center items-center'>
            <div className=' bg-white  p-10 md:p-0 md:h-[600px] md:w-[500px] absolute md:top-20 md:left-24 flex flex-col justify-evenly shadow-md rounded-lg'>
                <div className='flex flex-col gap-6 justify-center items-center'>
                    <img src={img2} className='h-[80px]' alt="" />
                    <p className='text-[rgb(134,136,102)] text-[20px]'>Welcome to TableSprint admin</p>
                </div>
                <div className='flex justify-center text-[#868686]'>
                    <div className='w-[80%]' >
                        <div className='flex flex-col'>
                            <label htmlFor="" className='w-[69px] text-center bg-white relative top-3 left-4'>Email-id</label>
                            <input onChange={(e) => {
                                setEmail(e.target.value)
                            }} type="email" className='border-[1px] border-[#868686] p-2 rounded-lg' />
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="" className='w-[72px] text-center bg-white relative top-3 left-4'>Password</label>
                            <input onChange={(e) => {
                                setpassword(e.target.value)
                            }} type="password" className='border-[1px] border-[#868686] p-2 rounded-lg' />
                            <button className='text-right text-violet-900 text-[16px] my-3 cursor-pointer'>Forgot Password?</button>
                        </div>

                        <button onClick={() => {
                            onSubmit()
                        }} className='w-full font-semibold text-white bg-violet-900 my-12 p-2 text-[20px] rounded-lg'> log in </button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default SignIn