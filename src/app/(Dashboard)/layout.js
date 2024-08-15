import React from 'react'
import Navbar from '../Components/Navbar';
export default function layout({ children }) {
    return <div className='bg-black'>
    <Navbar/>
    {children}</div>;
  }