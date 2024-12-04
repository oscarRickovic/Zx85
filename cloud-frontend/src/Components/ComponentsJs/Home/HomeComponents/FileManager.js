import React, { useState, useEffect } from "react";
import "../../../ComponentsCss/FileManager.css";
import "../../../ComponentsCss/FilesPath.css";
import "../../../ComponentsCss/ContextMenu.css";
import { FaFolder } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa";
import Folder from "../../../../Classes/Entities/Folder";
import File from "../../../../Classes/Entities/File";
import { CiFileOn } from "react-icons/ci";
import { FaFile } from "react-icons/fa";
import { MdOutlineCloudUpload } from "react-icons/md";
import FolderHierarchy from "./FolderHierarchy";
import { VscNewFolder } from "react-icons/vsc";
import FileManagerActionsHandler from "./Actions/FileManagerActionsHandler";

const FileManager = () => {
    // All useStates variables, setters.
    const Data = FileManagerActionsHandler.getData(); 
    const [workingDirectory, setWorkingDirectory] = useState(Data.Root);
    const [dividerPosition, setDividerPosition] = useState(20);
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [selectedItem, setSelectedItem] = useState(null);
    const [isEmptySpace, setIsEmptySpace] = useState(false);
    const [isCreatingFolder, setIsCreatingFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");

    // create Variables and functions for FileManagerActionsHndler
    const Variables = {
        workingDirectory,
        dividerPosition,
        menuVisible,
        menuPosition,
        selectedItem,
        isEmptySpace,
        isCreatingFolder,
        newFolderName
    }

    const Functions = {
        setWorkingDirectory,
        setDividerPosition,
        setMenuVisible,
        setMenuPosition,
        setSelectedItem,
        setIsEmptySpace,
        setIsCreatingFolder,
        setNewFolderName
    }

    // connect to FileManagerActionsHandler.
    const fileManagerActionsHandler = new FileManagerActionsHandler(Variables, Functions);
    
    // useEffects
    useEffect(() => {
        isResponsive();
    }, []);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [menuVisible]);

    // Functions
    const isResponsive = () => {
        let res = window.innerWidth <= 768;
        res && setDividerPosition(0);
        return res;
    };

    const handleRightClick = (e, item = null, emptySpace = false) => {
        fileManagerActionsHandler.handleRightClick(e, item, emptySpace);
    };

    const handleClickOutside = (e) => {
        fileManagerActionsHandler.handleClickOutside(e);
    };

    const handleNewFolderNameChange = (e) => {
        setNewFolderName(e.target.value);
    };

    const handleNewFolderCreation = (e) => {
        fileManagerActionsHandler.handleNewFolderCreation(e);
    };

    const handleAction = (action) => {
        fileManagerActionsHandler.handleAction(action);
    };

    const handleMouseMove = (e) => {
        fileManagerActionsHandler.handleMouseMove(e);
    };

    const handleMouseUp = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDown = () => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    return (
        <div className="fileManager">
            <div className="section left" style={{ width: `${dividerPosition}%` }}>
                <FolderHierarchy folder={Data.Root} setWorkingDirectory={setWorkingDirectory} />
            </div>

            <div className="divider" onMouseDown={handleMouseDown}></div>
            <div 
              className="section right" 
              style={{ width: `${100 - dividerPosition}%` }}
              onClick={()=> {
                if(!menuVisible) setIsCreatingFolder(false)
              }
            }>
                <div className="filesPath">
                    <div className="breadcrumb">
                        {workingDirectory.getPath().map((folder, index) => (
                            <div
                                key={index}
                                className="breadcrumb-item"
                                onClick={() => setWorkingDirectory(folder)}
                            >
                                {folder.name}
                                {index < workingDirectory.getPath().length - 1 && (
                                    <span className="separator">/</span>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="actions">
                        <div className="path-bar-icon">
                            <MdOutlineCloudUpload/>
                        </div>
                        <div  className="path-bar-icon">
                            <VscNewFolder />
                        </div>
                    </div>
                </div>

                <div
                    className="elements"
                    onContextMenu={(e) => {
                        if (!e.target.closest(".file") && !e.target.closest(".folder")) {
                            handleRightClick(e, null, true);
                        }
                    }}
                >
                    {isCreatingFolder ? (
                      <div className="folder">
                        <div className="folder-icon">
                            <FaFolder className="closeFolder" />
                            <FaFolderOpen className="openFolder" />
                        </div>
                      <input
                                type="text"
                                value={newFolderName}
                                onChange={handleNewFolderNameChange}
                                onKeyDown={handleNewFolderCreation}
                                autoFocus
                            />
                      </div>
                    ) : (
                        <>
                            {workingDirectory.subFolders.map((subFolder, index) => (
                                <div
                                    key={index}
                                    className= {
                                        selectedItem != null ? (selectedItem.path === subFolder.path ? "folder-selected" : "folder") : "folder"
                                    }
                                    onDoubleClick={() =>
                                        setWorkingDirectory(workingDirectory.subFolders[index])
                                    }
                                    onContextMenu={(e) => handleRightClick(e, subFolder)}
                                >
                                    <div className="folder-icon">
                                        <FaFolder className="closeFolder" />
                                        <FaFolderOpen className="openFolder" />
                                    </div>
                                    <div className="folder-name">{subFolder.name}</div>
                                </div>
                            ))}

                            {workingDirectory.subFiles.map((subFile, index) => (
                                <div
                                    key={index}
                                    className={
                                        selectedItem != null ? (selectedItem.path === subFile.path ? "file-selected" : "file") : "file"
                                    }
                                    onContextMenu={(e) => handleRightClick(e, subFile)}
                                >
                                    <div className="file-icon">
                                        <FaFile className="clickFile" />
                                        <CiFileOn className="noClickFile" />
                                    </div>
                                    <div className="file-name">{subFile.name}</div>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                {menuVisible && (
                    <div
                        className="context-menu"
                        style={{ top: menuPosition.y, left: menuPosition.x }}
                    >
                        <ul>
                            {isEmptySpace ? (
                                <>
                                    <li onClick={() => handleAction("Upload")}>Upload</li>
                                    <li onClick={() => handleAction("Create")}>New Folder</li>
                                </>
                            ) : (
                                <>
                                    <li onClick={() => handleAction("Open")}>Open</li>
                                    <li onClick={() => handleAction("Rename")}>Rename</li>
                                    <li onClick={() => handleAction("Download")}>Download</li>
                                    <li onClick={() => handleAction("Delete")}>Delete</li>
                                </>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileManager;
