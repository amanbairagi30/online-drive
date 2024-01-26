import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import React, { useEffect } from 'react'

const Navbar = ({ folderNames, setFolderNames, handleFolderClick }) => {
  // useEffect(() => {
  //   // When the main UI state changes, update the breadcrumbs accordingly
  //   setFolderNames([...folderNames]);
  // }, [folderNames, setFolderNames]);

  const handleNavigate = (index, id) => {
    const updatedFolderNames = folderNames.slice(0, index + 1);
    setFolderNames([...updatedFolderNames]);
    handleFolderClick(updatedFolderNames[updatedFolderNames.length - 1]);
  };

  const generateBreadcrumbs = () => {
    const breadcrumbs = folderNames.map((folder, index) => (
      <BreadcrumbItem key={index} onPress={() => handleNavigate(index, folder.id)}>
        {folder.name}
      </BreadcrumbItem>
    ));

    return breadcrumbs;
  };


  return (
    <>
      <nav>
        <div className=''>
          <div className='flex gap-4 '>
            <Breadcrumbs color={"foreground"}>
              <BreadcrumbItem onPress={() => handleNavigate(0)}>root</BreadcrumbItem>
              {generateBreadcrumbs()}
            </Breadcrumbs>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;


