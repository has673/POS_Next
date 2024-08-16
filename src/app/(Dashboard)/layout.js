import React from 'react'
import Navbar from '../Components/Navbar';
import Subheading from '../Components/Subheading';
export default function layout({ children }) {
    return <div className='flex flex-row'>
    <Navbar/>
    {children} </div>;
  }