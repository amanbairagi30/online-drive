import React, { useState } from 'react';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import Navbar from '../components/Navbar';
import SingleEntity from '../components/SingleEntity';

const Home = () => {
  const initialFiles = [
    {
      name: 'Documents',
      type: 'folder',
      children: [
        {
          name: 'Work',
          type: 'folder',
          children: [
            { name: 'Report.docx', type: 'file' },
            { name: 'Presentation.pptx', type: 'file' },
            { name: 'test.py', type: 'file' },
          ],
        },
        {
          name: 'Personal',
          type: 'folder',
          children: [
            { name: 'Vacation.jpg', type: 'file' },
            { name: 'ShoppingList.txt', type: 'file' },
          ],
        },
      ],
    },
    {
      name: 'Photos',
      type: 'folder',
      children: [
        { name: 'Family.jpg', type: 'file' },
        { name: 'Friends.jpg', type: 'file' },
      ],
    },
    {
      name: 'Music',
      type: 'folder',
      children: [
        { name: 'Song1.mp3', type: 'file' },
        { name: 'Song2.mp3', type: 'file' },
      ],
    },
    {
      name: 'Report.pdf',
      type: 'file',
    },
  ];

  const [folderHistory, setFolderHistory] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(initialFiles);
  const [folderNameArray, setFolderNameArray] = useState([]);

  const handleFolderClick = (folder) => {
    if (folder.type === 'folder') {

        const updateCurrentFolder = currentFolder.filter(item => item.name === folder.name)
      setFolderHistory([...folderHistory, currentFolder]);
      setCurrentFolder(folder.children);
      setFolderNameArray([...folderNameArray , folder.name])
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

  return (
    <>
      <main className=' border-red-500 p-4 min-h-screen'>
        <div className=' w-full grid grid-cols-1 gap-6 h-fit border-black mx-auto max-w-[1280px]'>
          {/* Navbar */}
          <section className='border-b h-[4rem] p-4 flex gap-4 items-center border-gray-400'>
            <BsArrowLeftCircleFill
              className='text-xl cursor-pointer text-gray-400'
              onClick={handleBackClick}
            />
            <Navbar folderNames = {folderNameArray}/>
          </section>

          {/* Main Screen */}
          <section className='border p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-x-0 gap-y-9 max-h-fit border-gray-300 rounded-md '>
            {currentFolder.map((entity) => (
              <SingleEntity
                key={entity.name}
                name={entity.name}
                type={entity.type}
                onClick={() => handleFolderClick(entity)}
              />
            ))}
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
