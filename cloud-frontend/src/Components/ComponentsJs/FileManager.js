import React, { useState, useEffect } from "react";
import "../ComponentsCss/FileManager.css";
import "../ComponentsCss/FilesPath.css";
import "../ComponentsCss/ContextMenu.css";
import { FaFolder } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa";
import Folder from "../../Classes/Entities/Folder";
import File from "../../Classes/Entities/File";
import { CiFileOn } from "react-icons/ci";
import { FaFile } from "react-icons/fa";
import FolderHierarchy from "./FolderHierarchy";

const FileManager = () => {
    // Initial setup
    let Root = new Folder();
    let Home = new Folder("Home", Root);
    let Documents = new Folder("Documents", Root);
    let Desktop = new Folder("Desktop", Root);
    let music = new Folder("music", Documents);
    let abdelhadi = new File("abdelhadi", Desktop);
    let abdelhadi2 = new File("abdelhadi", Root);

    const [workingDirectory, setWorkingDirectory] = useState(Root);
    const [dividerPosition, setDividerPosition] = useState(20);
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [selectedItem, setSelectedItem] = useState(null);
    const [isEmptySpace, setIsEmptySpace] = useState(false);
    const [isCreatingFolder, setIsCreatingFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");

    useEffect(() => {
        isResponsive();
    }, []);

    const isResponsive = () => {
        let res = window.innerWidth <= 768;
        res && setDividerPosition(0);
        return res;
    };

    const handleRightClick = (e, item = null, emptySpace = false) => {
        e.preventDefault();
        setSelectedItem(item);
        setIsEmptySpace(emptySpace);
        setMenuPosition({ x: e.clientX, y: e.clientY - 80 });
        setMenuVisible(true);
    };

    const handleClickOutside = (e) => {
        if (menuVisible && !e.target.closest(".context-menu")) {
            setMenuVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [menuVisible]);

    const handleCreateAction = () => {
        setIsCreatingFolder(true);
        setNewFolderName("");
        setMenuVisible(false);
    };

    const handleNewFolderNameChange = (e) => {
        setNewFolderName(e.target.value);
    };

    const handleNewFolderCreation = (e) => {
        if (e.key === "Enter" && newFolderName.trim()) {
            const newFolder = new Folder(newFolderName.trim(), workingDirectory);
            workingDirectory.addFolder(newFolder);
            setIsCreatingFolder(false);
            setNewFolderName("");
        } else if (e.key === "Escape") {
            setIsCreatingFolder(false);
            setNewFolderName("");
        }
    };

    const handleAction = (action) => {
        if (action === "Create") {
            handleCreateAction();
        }
        if (action === "Delete") {
          selectedItem.delete();
        }
        // Other actions here
        setMenuVisible(false);
    };

    const handleMouseMove = (e) => {
        try {
            const containerWidth = e.target.parentElement.offsetWidth; // Get the container width
            const newDividerPosition = (e.clientX / containerWidth) * 100; // Calculate new width percentage
            if (newDividerPosition > 10 && newDividerPosition < 90) { // Restrict resizing to reasonable bounds
                setDividerPosition(newDividerPosition);
            }
        } catch(error) {
            // do nothing
        }
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
                <FolderHierarchy folder={Root} setWorkingDirectory={setWorkingDirectory} />
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
                        <button className="upload-btn">Upload</button>
                        <button className="download-btn">Download</button>
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
                                    className="folder"
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
                                    className="file"
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
