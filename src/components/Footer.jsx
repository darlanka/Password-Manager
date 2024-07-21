import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-content items-center w-full bottom-0'>
        <h1 className='text-2 xl text font-bold text-center'>
            <span className='text-green-500'>&lt;</span>
            <span>Pass</span><span className='text-green-500'>Op/&gt;</span>
        </h1>
        <div className='flex justify-center items-center'>
            Created with <img className='w-7 mx-2 ' src="icons/heart.png" alt="" />By Darlanka Praneeth Naidu
        </div>
    </div>
  )
}

export default Footer
