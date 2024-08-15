import React from 'react'
import { contentArray } from '../../../public/array'

const Navbar = () => {
  return (
    <div className='bg-bg h-nav w-nav rounded-r-md flex flex-col '>
    <h2 className='text-pink tracking-normal text-center my-5 bg-bg'>CYPSOS</h2>

    {contentArray.map((item, index) => (
      <div key={index} id='tab'className="flex flex-col items-center mb-4 w-full bg-inherit ">
        <img src={item.imageUrl} alt={`Image ${index}`}   id='img'/>
        <p id='text' className="text-center text-white text-xs my-2">{item.text} </p>
      </div>
    ))}
      
    </div>
  )
}

export default Navbar
