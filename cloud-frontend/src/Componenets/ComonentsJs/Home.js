import { useState } from "react";
import { FileManager } from "@cubone/react-file-manager";
import "@cubone/react-file-manager/dist/style.css";
import "../ComponentsCss/Home.css";
import Terminal from "./Terminal";

function Home() {
  const [files, setFiles] = useState([
    {
      name: "Documents",
      isDirectory: true,
      path: "/Documents",
      updatedAt: "2024-09-09T10:30:00Z",
    },
    {
      name: "Pictures",
      isDirectory: true,
      path: "/Pictures",
      updatedAt: "2024-09-09T11:00:00Z",
    },
    {
      name: "Pic.png",
      isDirectory: false,
      path: "/Pictures/Pic.png",
      updatedAt: "2024-09-08T16:45:00Z",
      size: 2048,
    },
    {
        name: "Pic2.png",
        isDirectory: false,
        path: "/Pictures/Pic2.png",
        updatedAt: "2024-09-08T16:45:00Z",
        size: 2048,
      },
  ]);

  // Custom function to handle folder creation
  const handleCreateFolder = (newFolderName, parentPath) => {
    console.log(parentPath)
    ! parentPath && (parentPath = {name : "Home", isDirectory : true, path : ""})
    const newFolder = {
      name: newFolderName,
      isDirectory: true,
      path: `${parentPath.path}/${newFolderName}`,
      updatedAt: new Date().toISOString(),
    };
    console.log("Created Folder Data:", newFolder);
    setFiles((prevFiles) => [...prevFiles, newFolder]);
    console.log(files)
  };

  return (
    <>
      <FileManager files={files} onCreateFolder={handleCreateFolder} />
      <Terminal />
    </>
  );
}

export default Home;
