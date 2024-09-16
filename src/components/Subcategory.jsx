/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import ShowSubCategory from './subcategory/ShowSubCategory'
import AddSubCategory from './subcategory/AddSubCategory'
import EditSubCategory from './subcategory/EditSubCategory'
import axios from 'axios'

const Subcategory = () => {
    const [category, setCategory] = useState(true)
    const [addcategory, setAddCategory] = useState(false)
    const [editcategory, setEditCategory] = useState(false)
    const [data, setData]=useState([])
    const [editIddata, setEditIddata] = useState(null)
    
    const feditId = (data)=>{
         setEditIddata(data)
    }


    useEffect(() => {
        const getAllCategories = async () => {
        
            const token = localStorage.getItem("authToken");
            console.log(token)
            try { 
                const response = await axios.get("https://table-t0az.onrender.com/category", {
                    headers: {
                        Authorization: `Bearer ${token}` // Pass token in Authorization header
                    }
                });
                setData(response.data.data)
            } catch (error) {
                console.log("Error fetching categories:", error);
            }
        };
    
        getAllCategories();
    }, []);
    
    console.log(category)

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
                <div className='hidden md:block md:w-[20%]'>
                    <Sidebar name="subcategory" />
                </div>

                <div className='md:w-[80%]'>
                    
                   {category && <ShowSubCategory feditId={feditId} change={changeAddCategory} changeEdit={changeEditCategory}  />}

                   {addcategory && <AddSubCategory data={data}  change={changeAddCategoryreverse} />}

                   {editcategory && <EditSubCategory cdata={data}  data={editIddata} change={changeEditCategoryreverse}  />}

                </div>
            </div>
        </div>
    )
}

export default Subcategory