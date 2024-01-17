import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import React from 'react'

const Navbar = ({ folderNames, setFolderNames, handleFolderClick }) => {
  const handleNavigate = (index,id) => {
    console.log(id)
    folderNames.splice(index + 1);
    setFolderNames([...folderNames])
    console.log(folderNames)
    handleFolderClick(folderNames[folderNames.length - 1]);
  };

  return (
    <>
      <nav>
        <div className=''>
          <div className='flex gap-4 '>
            <Breadcrumbs color={"foreground"}>
              <BreadcrumbItem onPress={() => handleNavigate(0)}>root</BreadcrumbItem>
              {folderNames.map((folder, index) => (
                <BreadcrumbItem key={index} onPress={() => handleNavigate(index , folder.id)}>
                  {folder.name}
                </BreadcrumbItem>
              ))}
            </Breadcrumbs>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;


