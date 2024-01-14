// SingleEntity.js
import React from 'react';
import { FaFolder, FaFile, FaFileImage, FaFilePdf } from 'react-icons/fa';
import { BiSolidFileTxt } from 'react-icons/bi';
import { BsFiletypeMp4, BsFiletypeMp3, BsFiletypeTxt, BsFiletypeJpg, BsFiletypePdf, BsFiletypePpt,BsFiletypeDocx  } from 'react-icons/bs';
import { AiFillHtml5 } from 'react-icons/ai';

const SingleEntity = ({ name, type, onClick }) => {
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
      className='flex flex-col gap-4 items-start border-b md:border-none border-gray-300 md:items-center justify-center'
      onDoubleClick={onClick} // Handle double-click to show children
    >
      <div className=' flex md:flex-col gap-4 items-center justify-center border-black w-fit py-4 px-6'>
        {FileIcon && (
          <FileIcon className='text-[2rem] md:text-[4rem]  text-[#5fbfff]' />
        )}
        <p>{name}</p>
      </div>
    </div>
  );
};

export default SingleEntity;
