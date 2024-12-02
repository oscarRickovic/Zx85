import { useState } from "react";
import { FileManager } from "@cubone/react-file-manager";
import "@cubone/react-file-manager/dist/style.css";
import "../ComponentsCss/Home.css";
import Terminal from "./Terminal";
import DirFilesDatas from "../../Classes/Datas/DirFilesDatas";
import CreateFolderHandler from "../../Classes/EventHandlers/CreateFolderHandler";

function Home() {
  const [files, setFiles] = useState(DirFilesDatas.data);

  const handleCreateFolder = (newFolderName, parentPath) => {
    CreateFolderHandler.onCreateFolder(newFolderName, parentPath);
    setFiles([...DirFilesDatas.data]);
  };

  return (
    <>
      <FileManager 
        files={files} onCreateFolder={handleCreateFolder} />
      <Terminal />
    </>
  );
}

export default Home;
