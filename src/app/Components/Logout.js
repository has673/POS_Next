import Image from 'next/image'
import React from 'react'

const Logout = () => {
  return (
    <button>
    <div className=' flex flex-col items-center'>
    
    <Image src='/logout.png' width={20} height={10}/>
    <p className='text-white text-sm'>logout</p>
    </div>
    
    </button>
  )
}

export default Logout