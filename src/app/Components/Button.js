import React from 'react'

const Button = ({title, onClick}) => {
  return (
    <button id='button' onClick={onClick} className='bg-pink rounded-xl h-8  w-24 '>{title}</button>
  )
}

export default Button
