/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import arrow from "../../images/arrow.svg"
import s_arrow from "../../images/selected_arrow.svg"
import { Link } from 'react-router-dom'

const obj = [
  { id: 1, name: "Dashboard", image: "dashboard", src: "../../images/home.svg" , link:"/dashboard" },
  { id: 2, name: "Category", image: "category", src: "../../images/category.svg", link:"/category" },
  { id: 3, name: "Subcategory", image: "subcategory", src: "../../images/subcategory.svg", link:"/subcategory" },
  { id: 4, name: "Products", image: "products", src: "../../images/products.svg", link:"/products" },
]

const Sidebar = ({ name }) => {
  return (
    <div className='bg-[#f4f4f4] h-[calc(100vh-60px)] '>
      
      <div className='flex flex-col gap-5 py-10'>
        {obj.map((data, i) => (
          <Link to={data.link} key={i} >
             <div key={i} className={`flex justify-between pl-7 pr-3 items-center ${name === data.image?"bg-[#F4EDAF]":""}  py-2 cursor-pointer`}>
            <div className='flex gap-6 items-center'>
              <img src={data.src} className='h-[25px]' alt="" />
              <p className='text-[20px]'>{data.name}</p>
            </div>
            {name === data.image ? <div><img src={s_arrow} alt="" /></div> : <div><img src={arrow} alt="" /></div>}
          </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidebar