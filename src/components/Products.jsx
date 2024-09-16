/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import ShowProduct from './products/ShowProduct'
import AddProduct from './products/AddProduct'
import EditProduct from './products/EditProduct'
import axios from 'axios'



const Products = () => { 
    const [proData, setProData] = useState([])
    const [catData, setCatData] = useState(null)
    const [subCatData, setSubCatData] = useState(null)
    const [product, setproduct] = useState(true)
    const [addproduct, setAddproduct] = useState(false)
    const [editproduct, setEditproduct] = useState(false)
    const [editIddata, setEditIddata] = useState(null)
    
    const feditId = (data)=>{
         setEditIddata(data)
    }


    useEffect(() => {
        const getAllProduct = async () => {
            // Retrieve token from local storage
            console.log("gaurav soni")
            const token = localStorage.getItem("authToken");
            console.log(token)
            try {
                const response = await axios.get("https://table-t0az.onrender.com/product", {
                    headers: {
                        Authorization: `Bearer ${token}` // Pass token in Authorization header
                    }
                });
                setProData(response.data.data)
                console.log(response.data); // Handle the response
            } catch (error) {
                console.log("Error fetching categories:", error);
            }
        };

        getAllProduct();

        const getAllCategories = async () => {
            // Retrieve token from local storage
            console.log("gaurav soni")
            const token = localStorage.getItem("authToken");
            console.log(token)
            try {
                const response = await axios.get("https://table-t0az.onrender.com/category", {
                    headers: {
                        Authorization: `Bearer ${token}` // Pass token in Authorization header
                    }
                });
                setCatData(response.data.data)
                console.log(response.data); // Handle the response
            } catch (error) {
                console.log("Error fetching categories:", error);
            }
        };

        getAllCategories();

        const getAllSubCategories = async () => {
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
                setSubCatData(response.data.data)
                console.log(response.data); // Handle the response
            } catch (error) {
                console.log("Error fetching categories:", error);
            }
        };

        getAllSubCategories();
    }, []);

    const changeAddproduct = ()=>{
        setAddproduct(true)
        setproduct(false)
    }
  
    const changeAddproductreverse = ()=>{
        setAddproduct(false)
        setproduct(true)
    }

    const changeEditproduct = ()=>{
        setEditproduct(true)
        setproduct(false)
    }

    const changeEditproductreverse = ()=>{
        setEditproduct(false)
        setproduct(true)
    }
   
    return (
        <div className=''>
            <Navbar />

            <div className='flex relative top-[60px] overflow-x-hidden'>
                <div className='w-[20%]'>
                    <Sidebar name="products" />
                </div>

                <div className='w-[80%]'>
                    
                   {product && <ShowProduct feditId={feditId} category={catData} data={proData} change={changeAddproduct} changeEdit={changeEditproduct}  />}

                   {addproduct && <AddProduct category ={catData} subcategory={subCatData} change={changeAddproductreverse} />}

                   {editproduct && <EditProduct data={editIddata} category ={catData} subcategory={subCatData} change={changeEditproductreverse}  />}

                </div>
            </div>
        </div>
    )
}

export default Products