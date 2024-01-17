// SingleEntity.js
import React, { useEffect, useState } from 'react';
import { FaFolder, FaFile, FaFileImage, FaFilePdf } from 'react-icons/fa';
import { BiSolidFileTxt } from 'react-icons/bi';
import { BsFillExclamationCircleFill, BsFiletypeMp4, BsFiletypeMp3, BsFiletypeTxt, BsFiletypeJpg, BsFiletypePdf, BsFiletypePpt, BsFiletypeDocx } from 'react-icons/bs';
import { AiFillHtml5 } from 'react-icons/ai';
import { PiPencilLineFill } from 'react-icons/pi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useFileEntityContext } from '../context/FileEntityContext';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';



const SingleEntity = ({ name, id, type, onClick, currentFolder, location }) => {
  const isSidebar = location === 'sidebar';
  console.log("Sidebar : ", isSidebar)

  const { files, setFiles } = useFileEntityContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newEntityValue, setNewEntityValue] = useState("");
  const [prevEntityName, setPrevEntityName] = useState("");
  const [nameError, setNameError] = useState();


  const handleOpenModal = () => {
    onOpenChange(true);
    const clickedEntity = currentFolder.filter((item) => item.id === id);
    setPrevEntityName(clickedEntity[0].name)
  }

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

  const handleRename = (entityId, newName) => {
    if (!newName) {
      console.error('Please enter a new name.');
      return;
    }

    // // Check if the new name already exists in the current folder
    const isNameExists = currentFolder.some((item) => item.name === newName);

    if (isNameExists) {
      setNameError('A file or folder with the same name already exists in the current folder.');
      return;
    }
    setFiles((prevFiles) => {
      const updatedFiles = renameEntity(prevFiles, entityId, newName);
      return updatedFiles;
    });

    onOpenChange(false);

  };

  const renameEntity = (files, entityId, newName) => {
    return files.map((item) => {
      if (item.id === entityId) {
        // If the current item matches the entityId, update its name
        return { ...item, name: newName };
      } else if (item.children && item.children.length > 0) {
        // If the item has children, recursively rename from them
        return { ...item, children: renameEntity(item.children, entityId, newName) };
      }
      return item;
    });
  };



  const handleEntityValue = (e) => {
    setNewEntityValue(e.target.value);
  }


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
      className={`flex md:flex-col col-auto gap-4 ${isSidebar ? "w-full" : "md:w-fit md:justify-center pb-2"} hover:bg-[#d4eeff] items-start border-b md:border-none border-gray-300 md:items-center justify-between `}
      onDoubleClick={onClick} // Handle double-click to show children
    >
      <div className={`flex  flex-wrap ${isSidebar ? "flex-row shadow-md justify-start w-full " : " md:flex-col justify-center"}  flex-wrap gap-4 items-center  cursor-pointer border-black  py-4 px-6`}>
        {FileIcon && (
          <FileIcon className={`text-[2rem] ${isSidebar ? "text-[20px]" : "md:text-[4rem]"}   text-[#5fbfff]`} />
        )}
        <p className='w-[6rem] break-words text-center'>{name}</p>
      </div>

      <div className={`${isSidebar && "hidden"} flex gap-2`}>
        <PiPencilLineFill onClick={() => { handleOpenModal() }} className='text-md cursor-pointer' />
        <RiDeleteBinLine onClick={() => handleDelete(id)} className='text-md cursor-pointer hover:text-red-500' />
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Rename</ModalHeader>
              <ModalBody className='flex items-center'>

                <span className='font-semibold'>Current Name : {prevEntityName}</span>

                <Input
                  color=''
                  type="text"
                  label="File/Folder New Name"
                  value={newEntityValue}
                  placeholder={prevEntityName}
                  onChange={(e) => handleEntityValue(e)}
                />

                {
                  nameError &&
                  <span className='text-red-500 font-semibold flex items-start gap-2'><BsFillExclamationCircleFill className='text-2xl' /> {nameError}</span>
                }

              </ModalBody>
              <ModalFooter>
                {/* "Create" Button */}
                <Button className='w-full text-md' color="primary" type='submit' onPress={() => handleRename(id, newEntityValue)}>
                  Rename
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SingleEntity;
