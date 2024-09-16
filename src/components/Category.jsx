/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

import ShowCategory from './category/showCategory'
import AddCategory from './category/AddCategory'
import EditCategory from './category/editCategory'
import axios from 'axios'



const Category = () => {
   
 
    const [category, setCategory] = useState(true)
    const [addcategory, setAddCategory] = useState(false)
    const [editcategory, setEditCategory] = useState(false)
    const [editIddata, setEditIddata] = useState(null)
    
    const feditId = (data)=>{
         setEditIddata(data)
    }

    const changeAddCategory = ()=>{
        setAddCategory(true)
        setCategory(false)
    }
  
    const changeAddCategoryreverse = ()=>{
        setAddCategory(false)
        setCategory(true)
    }

    const changeEditCategory = ()=>{
        setEditCategory(true)
        setCategory(false)
    }

    const changeEditCategoryreverse = ()=>{
        setEditCategory(false)
        setCategory(true)
    }
   
    return (
        <div className=''>
            <Navbar />

            <div className='flex relative top-[60px] overflow-x-hidden'>
                <div className='hidden md:block md:w-[20%] '>
                    <Sidebar name="category" />
                </div>

                <div className='md:w-[80%]'>
                    
                   {category && <ShowCategory fiddata={feditId} change={changeAddCategory} changeEdit={changeEditCategory}  />}

                   {addcategory && <AddCategory change={changeAddCategoryreverse} />}

                   {editcategory && <EditCategory data={editIddata} change={changeEditCategoryreverse}  />}

                </div>
            </div>
        </div>
    )
}

export default Category