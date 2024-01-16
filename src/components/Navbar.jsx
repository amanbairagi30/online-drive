import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import React from 'react'

const Navbar = ({ folderNames }) => {
  return (
    <>
      <nav >

        <div className=''>
          <div className='flex gap-4 '>

            <Breadcrumbs  color={"foreground"}>
              <BreadcrumbItem>root</BreadcrumbItem>
              {folderNames.map((elem, index) => (
                <BreadcrumbItem>{elem}</BreadcrumbItem>
              ))}
            </Breadcrumbs>
          </div>
          {/* 
            <span className='mr-2 font-semibold'>root</span>
            <span className='mr-2'>/</span>
            {folderNames.map(elem => <><div className='font-semibold'></div><span className='text-gray-400'>/</span></>)} */}
        </div>

      </nav>
    </>
  )
}

export default Navbar
