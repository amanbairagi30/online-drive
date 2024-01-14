import React from 'react'

const Navbar = ({ folderNames }) => {
  return (
    <>
      <nav >

        <p className=''>

          <div className='flex gap-4 '>
          <span className='mr-2 font-semibold'>root</span>
          <span className='mr-2'>/</span>
            {folderNames.map(elem => <><div className='font-semibold'>{elem}</div><span className='text-gray-400'>/</span></>)}
          </div>
        </p>

      </nav>
    </>
  )
}

export default Navbar
