import Subheading from '@/app/Components/Subheading'
import React from 'react'

const page = async () => {
  const response = await fetch("http://localhost:4000/employees")
  const data = await response.json();
  const count = data.length;
  console.log(data)
  return (
    <div >
    <Subheading title='Staff Managment'/>

    <h3 className='font-medium text-2xl leading-9 ml-4 mt-6'>Staff({count})</h3>
    </div>
  )
}

export default page