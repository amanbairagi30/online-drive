import React from 'react';
import { FaFolder } from 'react-icons/fa';
import { FaFile } from 'react-icons/fa';
import { FaFilePdf } from 'react-icons/fa';
import { BiSolidFileTxt } from 'react-icons/bi';
import { AiFillHtml5 } from 'react-icons/ai';
import { FaFileImage } from 'react-icons/fa';

const SingleEntity = ({ name, type }) => {
    let FileIcon = null;

    switch (type.toLowerCase()) {
        case 'folder':
            FileIcon = FaFolder;
            break;
        case 'file':
            FileIcon = FaFile;
            break;
        case 'jpg':
            FileIcon = FaFileImage;
            break;
        case 'pdf':
            FileIcon = FaFilePdf;
            break;
        case 'txt':
            FileIcon = BiSolidFileTxt;
            break;
        case 'html':
            FileIcon = AiFillHtml5;
            break;
        default:
            break;
    }

    return (
        <div className='flex flex-col gap-4 items-start border-b md:border-none border-gray-300 md:items-center justify-center'>
            <div className=' flex md:flex-col gap-4 items-center justify-center border-black w-fit py-4 px-6'>
                {FileIcon && <FileIcon className='text-[2rem] md:text-[4rem]  text-[#5fbfff]' />}
                <p>{name}</p>
            </div>
        </div>
    );
};

export default SingleEntity;
