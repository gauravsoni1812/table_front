/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import Dashboard from './components/dashboard';
import Category from './components/Category';
import Subcategory from './components/Subcategory';
import Products from './components/Products';

// Import the AppProvider

const App = () => {
  return (
  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/category" element={<Category />} />
          <Route path="/subcategory" element={<Subcategory />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </BrowserRouter>
  
  );
};

export default App;
