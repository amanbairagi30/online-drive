import React, { useState } from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import { FaEye ,FaEyeSlash  } from "react-icons/fa";
import { useFileEntityContext } from '../context/FileEntityContext';
import SingleEntity from './SingleEntity';

const Sidebar = ({
  folderHistory,
  handleFolderClick,
  setCurrentFolder,
  currentFolder,
  currentFolderID,
}) => {
  const { files } = useFileEntityContext();

  const[toggleClose , setToggleClose] = useState(false);

  const Icon = !toggleClose ? FaEyeSlash  : FaEye

  return (
    <div className={`${toggleClose ? "h-[3rem] overflow-hidden" : ""} md:w-full`}>
      <div className={`bg-[#d4eeff] w-full  px-2 py-3 rounded-md flex items-center justify-between text-sm text-center h-fit font-semibold`}>
        <p>Quick Navigation</p>
        <span className='block md:hidden'><Icon onClick={()=>setToggleClose(!toggleClose)} className='text-xl cursor-pointer' /></span>
      </div>

      {/* list of folders and subfolders */}
      <div className='mt-4 w-full'>
        {files.map((entity) => (
          <SingleEntity
            key={entity.id}
            name={entity.name}
            type={entity.type}
            id={entity.id}
            location={"sidebar"}
            onClick={() => handleFolderClick(entity)}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
