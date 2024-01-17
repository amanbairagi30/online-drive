import React, { useState } from 'react';
import { Button, Card, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Tabs } from '@nextui-org/react';
import { useFileEntityContext } from '../context/FileEntityContext';
import { BsFillExclamationCircleFill } from "react-icons/bs"

const Form = ({ isOpen, onOpenChange, currentFolder, currentFolderID ,setCurrentFolder }) => {
    const { files, setFiles } = useFileEntityContext();
    const [nameError, setNameError] = useState('');

    // State variables to store input field values
    const [folderName, setFolderName] = useState('');
    const [fileName, setFileName] = useState('');

    // Event handlers to update state on input change
    const handleFolderNameChange = (e) => {
        setFolderName(e.target.value);
    };

    const handleFileNameChange = (e) => {
        setFileName(e.target.value);
    };

    // Event handler for the "Create" button
    const handleCreate = () => {
        // Check if either folderName or fileName is empty
        if (!folderName && !fileName) {
            console.error('Please enter either a Folder Name or a File Name.');
            return;
        }

        const isNameExists = currentFolder.some((item) => item.name === (folderName || fileName));

        if (isNameExists) {
            setNameError('A file or folder with the same name already exists in the current folder.');
            return;
        }

        setNameError('')

        // Create the new entity based on whether it's a folder or file
        const newEntity = folderName
            ? { id: crypto.randomUUID(), name: folderName, type: 'folder', children: [] }
            : { id: crypto.randomUUID(), name: fileName, type: 'file' };

        setFiles((prevFiles) => {
            if (currentFolder === prevFiles) {
                return [...prevFiles, newEntity]
            }

            const updatedFiles = updateFiles(prevFiles, currentFolder, currentFolderID, newEntity);

            return updatedFiles;
        });

        // Update the currentFolder state to include the new entity
        setCurrentFolder((prevCurrentFolder) => {

            if (currentFolder === prevCurrentFolder) {
                return [...prevCurrentFolder, newEntity];
            }

            const updatedCurrentFolder = updateFiles(prevCurrentFolder, currentFolder, currentFolderID, newEntity);
           

            return updatedCurrentFolder;
        });

        setFolderName('')
        setFileName('')
        // Close the modal
        onOpenChange(false);
    };

    // Recursive function to update the files structure
    const updateFiles = (files, currentFolder, currentFolderID, newEntity) => {
        return files.map((item) => {
            if (item.id === currentFolderID) {
                // If the current item matches the currentFolderID, update it
                return { ...item, children: [...item.children, newEntity] };
            } else if (item.children && item.children.length > 0) {
                // If the item has children, recursively update them
                return { ...item, children: updateFiles(item.children, currentFolder, currentFolderID, newEntity) };
            }
            return item;
        });
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Create</ModalHeader>
                        <ModalBody className='flex items-center'>
                            <Tabs fullWidth size="lg" color='primary' aria-label="Options">
                                <Tab key="folder" className='w-full flex flex-col gap-4' title="Folder">
                                    <Card className='w-full'>
                                        {/* Controlled Input for Folder Name */}
                                        <Input
                                            color=''
                                            type="text"
                                            label="Folder Name"
                                            value={folderName}
                                            onChange={handleFolderNameChange}
                                        />
                                    </Card>
                                    {
                                        nameError &&
                                        <span className='text-red-500 font-semibold flex items-start gap-2'><BsFillExclamationCircleFill className='text-2xl' /> {nameError}</span>
                                    }
                                </Tab>
                                <Tab className='w-full flex flex-col gap-4' key="music" title="File">
                                    <Card className='w-full '>
                                        {/* Controlled Input for File Name */}
                                        <Input
                                            color=''
                                            type="text"
                                            label="File Name"
                                            value={fileName}
                                            onChange={handleFileNameChange}
                                        />

                                    </Card>
                                    {
                                        nameError &&
                                        <span className='text-red-500 font-semibold  flex items-start gap-2'><BsFillExclamationCircleFill className='text-2xl' /> {nameError}</span>
                                    }
                                </Tab>
                            </Tabs>
                        </ModalBody>
                        <ModalFooter>
                            {/* "Create" Button */}
                            <Button className='w-full text-md' color="primary" onPress={handleCreate}>
                                Create
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default Form;
