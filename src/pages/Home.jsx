import React, { useCallback, useEffect, useState } from 'react';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import Navbar from '../components/Navbar';
import SingleEntity from '../components/SingleEntity';
import { useFileEntityContext } from '../context/FileEntityContext';
import { FaPlus } from 'react-icons/fa6';
import { GoPlus } from 'react-icons/go';
import { CgMenuRight } from 'react-icons/cg';
import { IoIosCloseCircleOutline  } from 'react-icons/io';
import { Button, useDisclosure } from '@nextui-org/react';
import Form from '../components/Form';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { files, setFiles } = useFileEntityContext();

  const [folderHistory, setFolderHistory] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(files);
  const [folderNameArray, setFolderNameArray] = useState([]);
  const [currentFolderID, setCurrentFolderID] = useState('');
  const [pathHistory, setPathHistory] = useState([]);

  const [toggle, setToggle] = useState(false);



  // useEffect(() => {
  //   setCurrentFolder(files);
  // }, [files]);


  const findClickedFolder = (current, targetId, path = []) => {
    if (current.id === targetId) {
      return { folder: current, path };
    }

    if (current.children) {
      for (const child of current.children) {
        const foundFolder = findClickedFolder(child, targetId, [...path, current]);
        if (foundFolder) {
          return foundFolder;
        }
      }
    }

    return null;
  };
  const generateFullPath = (path) => {
    return path.filter(folder => folder.name && folder.id).map(folder => ({ name: folder.name, id: folder.id }));
  };

  const handleFolderClick = useCallback((folder) => {
    const { folder: clickedFolder, path } = findClickedFolder({ children: files }, folder.id);

    if (clickedFolder && clickedFolder.children) {
      const fullPath = generateFullPath([...path, clickedFolder]);

      setCurrentFolder(clickedFolder.children);
      setFolderHistory([...folderHistory, currentFolder]);
      setFolderNameArray(fullPath);
      setCurrentFolderID(folder.id);

      // Update path history
      setPathHistory([...pathHistory, fullPath]);
    }
  }, [currentFolder, folderHistory, folderNameArray, pathHistory]);

  const handleBackClick = () => {
    if (folderHistory.length > 0 && pathHistory.length > 0) {
      const previousFolder = folderHistory.pop();

      const previousPath = pathHistory.pop();
      setPathHistory([...pathHistory]);

      folderNameArray.pop();

      // Update folderNameArray based on the previousPath
      // const updatedFolderNamesArray = previousPath.map(folder => ({ name: folder.name, id: folder.id }));
      // setFolderNameArray(updatedFolderNamesArray);

      //  // Update folderNameArray based on the previousPath
      const updatedFolderNamesArray = pathHistory.flat().map(folder => ({ name: folder.name, id: folder.id }));
      setFolderNameArray(updatedFolderNamesArray);

      setFolderHistory([...folderHistory]);
      setCurrentFolder(previousFolder);

      // Update path history
    } else {
      setFolderNameArray([]);
    }
  };


  return (
    <>
      <div className={`${!toggle && "hidden"} bg-black absolute opacity-70 z-[200] w-screen h-screen`}></div>
      <main className=' border-red-500 p-4 min-h-screen'>
        <div className=' w-full grid grid-cols-9 gap-y-6 gap-x-4 h-fit border-black mx-auto max-w-[1280px]'>



          {/* Navbar */}
          <section className='border-b h-[4rem] col-span-9 p-4 flex gap-4 items-center justify-between border-gray-400'>
            <div className='flex items-center gap-2'>

              <BsArrowLeftCircleFill
                className='text-xl cursor-pointer text-gray-400'
                onClick={() => handleBackClick()}
              />
              <Navbar handleFolderClick={handleFolderClick} setFolderNames={setFolderNameArray} folderNames={folderNameArray} />
            </div>
            <div className='block text-xl md:hidden' onClick={() => setToggle(!toggle)}><CgMenuRight /></div>
          </section>

          <aside className={`col-span-9 ${toggle ? "block rounded-l-lg z-[300] p-4 md:p-0 absolute top-2 shadow-2xl right-0 bg-[#fff] w-[70%]" : " hidden md:col-span-2 md:flex flex-col items-center justify-start p-2 border border-gray-300 rounded-md "}`}>
            <div className='w-full relative'>
              <div onClick={()=>setToggle(!toggle)} className='md:hidden cursor-pointer block text-xl absolute top-3 right-10'><IoIosCloseCircleOutline /></div>
              <Sidebar handleFolderClick={handleFolderClick} />
            </div>
          </aside>

          {/* Main Screen */}
          <section className='border  p-4 grid grid-cols-1 gap-4 col-span-9 md:col-span-7 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-9 h-fit gray-300 rounded-md '>
            {currentFolder?.map((entity, ind) => (
              <SingleEntity
                key={ind}
                name={entity?.name}
                type={entity?.type}
                id={entity?.id}
                currentFolder={currentFolder}
                setCurrentFolder={setCurrentFolder}
                onClick={() => handleFolderClick(entity)}
              />
            ))}

            <div className='flex items-center  justify-center w-full'>
              <Button onPress={onOpen} className='border-2 bg-gray-0 rounded-md w-full hover:bg-gray-100 hover:cursor-pointer h-full flex items-center justify-center border-dashed border-gray-400'>
                <GoPlus className='text-3xl' />
              </Button>
            </div>
          </section>



          <Form isOpen={isOpen} onOpenChange={onOpenChange} currentFolder={currentFolder} currentFolderID={currentFolderID} setCurrentFolder={setCurrentFolder} />

        </div>
      </main>
    </>
  );
};

export default Home;
