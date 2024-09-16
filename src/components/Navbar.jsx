/* eslint-disable no-unused-vars */
import React from 'react'
import img1 from "../../images/white_logo.svg"
import img2 from "../../images/profile.svg"

const Navbar = () => {
  return (
    <div className='bg-[#662671] flex justify-between items-center h-[60px] px-7 fixed w-[100vw] z-30'>
      <div><img src={img1} className='h-[28px]' alt="" /></div>
      <div><img src={img2}  className='h-[28px]' alt="" /></div>
    </div>
  )
}

export default Navbar