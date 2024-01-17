import React, { useEffect, useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { useFileEntityContext } from '../context/FileEntityContext';
import SingleEntity from './SingleEntity';

const Sidebar = ({
  handleFolderClick,
}) => {
  const { files } = useFileEntityContext();

  const [toggleClose, setToggleClose] = useState(false);
  const Icon = !toggleClose ? FaEyeSlash : FaEye;


  const renderEntities = (entities, location) => {
    return (
      <div className={`${toggleClose ? 'h-[0.8rem] overflow-hidden' : ' max-h-[25rem] overflow-scroll '} md:w-full`}>


        {/* List of folders and subfolders */}
        <div className='mt-4 w-full'>
          {entities.map((entity) => (
            <div key={entity.id}>

              <SingleEntity
                name={entity.name}
                type={entity.type}
                id={entity.id}
                location={location}
                onClick={() => handleFolderClick(entity)}
              />

              {entity.children && entity.children.length > 0 && (
                <div className='ml-4'>
                  {renderEntities(entity.children, location)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    renderEntities(files, 'sidebar');
  }, [files])

  return <>
    <div className={`bg-[#d4eeff] w-full  px-2 py-3 rounded-md flex items-center justify-between text-sm text-center h-fit font-semibold`}>
      <p>Quick Navigation</p>
      <span className='block md:hidden'><Icon onClick={() => setToggleClose(!toggleClose)} className='text-xl cursor-pointer' /></span>
    </div>
    {renderEntities(files, 'sidebar')}
  </>
};

export default Sidebar;
