// SingleEntity.js
import React from 'react';
import { FaFolder, FaFile, FaFileImage, FaFilePdf } from 'react-icons/fa';
import { BiSolidFileTxt } from 'react-icons/bi';
import { BsFiletypeMp4, BsFiletypeMp3, BsFiletypeTxt, BsFiletypeJpg, BsFiletypePdf, BsFiletypePpt, BsFiletypeDocx } from 'react-icons/bs';
import { AiFillHtml5 } from 'react-icons/ai';
import { PiPencilLineFill } from 'react-icons/pi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useFileEntityContext } from '../context/FileEntityContext';
import { useDisclosure } from '@nextui-org/react';

const SingleEntity = ({ name, id, type, onClick ,currentFolder}) => {

  const { files, setFiles } = useFileEntityContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Function to handle delete operation
  const handleDelete = (entityId) => {
    setFiles((prevFiles) => {
      const updatedFiles = deleteEntity(prevFiles, currentFolder, entityId);
      return updatedFiles;
    });
  };

  const deleteEntity = (files, currentFolder, entityId) => {
    return files.map((item) => {
      if (item.id === entityId) {
        // If the current item matches the currentFolderID, remove it
        return undefined;
      } else if (item.children && item.children.length > 0) {
        // If the item has children, recursively delete from them
        return { ...item, children: deleteEntity(item.children, currentFolder, entityId) };
      }
      return item;
    }).filter(Boolean); // Remove undefined items
  };


  let FileIcon = null;

  switch (type.toLowerCase()) {
    case 'folder':
      FileIcon = FaFolder;
      break;
    case 'file':
      FileIcon = FaFile;
      break;
    default:
      break;
  }

  switch (name.split(".")[1]) {
    case 'jpg':
      FileIcon = BsFiletypeJpg;
      break;
    case 'pdf':
      FileIcon = BsFiletypePdf;
      break;
    case 'txt':
      FileIcon = BsFiletypeTxt;
      break;
    case 'html':
      FileIcon = AiFillHtml5;
      break;
    case 'mp4':
      FileIcon = BsFiletypeMp4;
      break;
    case 'mp3':
      FileIcon = BsFiletypeMp3;
      break;
    case 'pptx':
      FileIcon = BsFiletypePpt;
      break;
    case 'docx':
      FileIcon = BsFiletypePpt;
      break;
    case 'docx':
      FileIcon = BsFiletypeDocx;
      break;
    default:
      break;
  }

  return (
    <div
      className='flex  gap-4 items-start border-b md:border-none border-gray-300 md:items-start justify-between md:justify-center'
      onDoubleClick={onClick} // Handle double-click to show children
    >
      <div className=' flex md:flex-col flex-wrap gap-4 items-center justify-center border-black w-fit  py-4 px-6'>
        {FileIcon && (
          <FileIcon className='text-[2rem] md:text-[4rem]  text-[#5fbfff]' />
        )}
        <p>{name}</p>
      </div>

      <div className='flex md:flex-col gap-2'>
        <PiPencilLineFill onClick={() => alert(id)} className='text-md cursor-pointer' />
        <RiDeleteBinLine onClick={() => handleDelete(id)} className='text-md cursor-pointer hover:text-red-500' />
      </div>
    </div>
  );
};

export default SingleEntity;
