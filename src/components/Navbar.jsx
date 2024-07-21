import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>
      <div className="mycontainer flex px-4 h-14  justify-around py-5   items-center">
      <div className="logo font-bold text-2xl">
          <span className='text-green-700'>&lt;</span>
            Pass
          <span className='text-green-700'>Op/&gt;</span>
      </div>    
      <div>
        <button className='text-white bg-green-700 flex justify-betweem items-center ring-white ring-1  my-5 rounded-full'>
          <img  className='invert p-1 w-10'src="icons/github.svg" alt="github logo" />
          <span className='font-bold px-2'>Github</span>
        </button>
      </div>
      </div>
      
    </nav>
  )
}

export default Navbar
