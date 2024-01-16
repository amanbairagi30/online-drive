import React, { createContext, useContext, useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = 'fileData';

const initialFiles = [
  {
    id: "f954a754-5425-454a-8541-4a454a4a54a4",
    name: "Documents",
    type: "folder",
    children: [
      {
        id: "4a5454a5-54a5-454a-54a5-54a54a544a54",
        name: "Work",
        type: "folder",
        children: [
          { id: "054a54a5-54a5-54a5-4a54-54a54a54a545", name: "Report.docx", type: "file" },
          { id: "654a54a5-54a5-54a5-54a5-4a5454a54a54", name: "Presentation.pptx", type: "file" },
          { id: "d54a54a5-54a5-4a54-4a54-a54a54a54a54", name: "test.py", type: "file" }
        ]
      },
      {
        id: "54a4a54a-54a5-54a5-54a5-4a54a54a4a54",
        name: "Personal",
        type: "folder",
        children: [
          { id: "e54a54a5-54a5-4a54-54a5-a54a54a54a54", name: "Vacation.jpg", type: "file" },
          { id: "f54a54a5-54a5-54a5-54a5-54a54a544a54", name: "ShoppingList.txt", type: "file" }
        ]
      }
    ]
  },
  {
    id: "f54a54a5-54a5-4a54-a54a-54a54a544a54",
    name: "Photos",
    type: "folder",
    children: [
      { id: "454a54a4-54a5-4a54-a54a-54a54a544a54", name: "Family.jpg", type: "file" },
      { id: "54a54a54-a54a-54a5-4a54-54a54a544a54", name: "Friends.jpg", type: "file" }
    ]
  },
  {
    id: "4a54a54a-54a5-54a5-54a5-4a54a54a4a54",
    name: "Music",
    type: "folder",
    children: [
      { id: "a54a54a5-54a5-4a54-a54a-54a54a4a4a54", name: "Song1.mp3", type: "file" },
      { id: "54a54a4a-54a5-54a5-54a5-4a54a54a4a54", name: "Song2.mp3", type: "file" }
    ]
  },
  { id: "f54a54a5-54a5-54a5-54a5-4a54a54a4a54", name: "Report.pdf", type: "file" }
]

const FileEntityContext = createContext();

export const useFileEntityContext = () => {
  return useContext(FileEntityContext);
};

export const FileEntityProvider = ({ children }) => {
  const [files, setFiles] = useState(() => {
    // Load initial data from localStorage
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : initialFiles;
  });

  useEffect(() => {
    // Save data to localStorage whenever files change
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(files));
  }, [files]);

  const value = {
    files,
    setFiles,
  };

  return <FileEntityContext.Provider value={value}>{children}</FileEntityContext.Provider>;
};
