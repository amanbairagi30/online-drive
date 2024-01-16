import React, { useEffect, useState } from 'react';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import Navbar from '../components/Navbar';
import SingleEntity from '../components/SingleEntity';
import { useFileEntityContext } from '../context/FileEntityContext';
import { FaPlus } from 'react-icons/fa6';
import { GoPlus } from 'react-icons/go';
import { Button, useDisclosure } from '@nextui-org/react';
import Form from '../components/Form';

const Home = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { files, setFiles } = useFileEntityContext();

  const [folderHistory, setFolderHistory] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(files);
  const [folderNameArray, setFolderNameArray] = useState([]);
  const [currentFolderID, setCurrentFolderID] = useState('');


  useEffect(() => {
    // Update currentFolder when files change
    setCurrentFolder(files);
  }, [files]);

  const handleFolderClick = (folder) => {
    if (folder.type === 'folder') {

      const updateCurrentFolder = currentFolder.filter(item => item.name === folder.name)
      setFolderHistory([...folderHistory, currentFolder]);
      setCurrentFolder(folder.children);
      setFolderNameArray([...folderNameArray, folder.name])
      setCurrentFolderID(folder.id);
    }
  };

  const handleBackClick = () => {
    if (folderHistory.length > 0) {
      const previousFolder = folderHistory.pop();
      folderNameArray.pop();
      setFolderHistory([...folderHistory]);
      setCurrentFolder(previousFolder);
    }
  };

  console.log(folderNameArray)
  console.log(files)
  console.log("currentFolder : ", currentFolder)
  console.log("currentFolder ID : ", currentFolderID)

  return (
    <>
      <main className=' border-red-500 p-4 min-h-screen'>
        <div className=' w-full grid grid-cols-1 gap-6 h-fit border-black mx-auto max-w-[1280px]'>
          {/* Navbar */}
          <section className='border-b h-[4rem] p-4 flex gap-4 items-center border-gray-400'>
            <BsArrowLeftCircleFill
              className='text-xl cursor-pointer text-gray-400'
              onClick={() => handleBackClick()}
            />
            <Navbar folderNames={folderNameArray} />
          </section>

          {/* Main Screen */}
          <section className='border p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-x-0 gap-y-9 max-h-fit border-gray-300 rounded-md '>
            {currentFolder?.map((entity) => (
              <SingleEntity
                key={entity?.name}
                name={entity?.name}
                type={entity?.type}
                id={entity?.id}
                currentFolder={currentFolder}
                onClick={() => handleFolderClick(entity)}
              />
            ))}

            <div className='flex items-center px-14 py-2 justify-center w-full'>
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
