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
  let Root = new Folder();
  let Home = new Folder("Home", Root);
  let Documents = new Folder("Documents", Root);
  let Desktop = new Folder("Desktop", Root);
  let music = new Folder("music", Documents);
  let abdelhadi = new File("abdelhadi", Desktop);
  let abdelhadi2 = new File("abdelhadi", Root);

  const [workingDirectory, setWorkinDirectory] = useState(Root);
  const [dividerPosition, setDividerPosition] = useState(20);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    isResponsive();
  }, []);

  const isResponsive = () => {
    let res = window.innerWidth <= 768;
    res && setDividerPosition(0);
    return res;
  };

  const handleRightClick = (e, item) => {
    e.preventDefault();
    setSelectedItem(item);
    setMenuPosition({ x: e.clientX, y: e.clientY });
    setMenuVisible(true);
  };

  const handleClickOutside = (e) => {
    if (menuVisible && !e.target.closest('.context-menu')) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuVisible]);

  const handleAction = (action) => {
    if (selectedItem) {
      console.log(`${action} action for ${selectedItem.name}`);
    }
    setMenuVisible(false);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();

    const startX = e.clientX;
    
    const handleMouseMove = (moveEvent) => {
      const newDividerPosition = dividerPosition + (moveEvent.clientX - startX);
      setDividerPosition(Math.max(0, Math.min(100, newDividerPosition)));
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="fileManager">
      <div className="section left" style={{ width: `${dividerPosition}%` }}>
        <FolderHierarchy folder={Root} setWorkingDirectory={setWorkinDirectory} />
      </div>

      <div className="divider" onMouseDown={handleMouseDown}></div>
      <div className="section right" style={{ width: `${100 - dividerPosition}%` }}>
        <div className="filesPath">
          <div className="breadcrumb">
            {workingDirectory.getPath().map((folder, index) => (
              <div
                key={index}
                className="breadcrumb-item"
                onClick={() => setWorkinDirectory(folder)}
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

        <div className="elements">
          {/* Folder Items */}
          {workingDirectory.subFolders.map((subFolder, index) => (
            <div
              key={index}
              className="folder"
              onDoubleClick={() => setWorkinDirectory(workingDirectory.subFolders[index])}
              onContextMenu={(e) => handleRightClick(e, subFolder)}
            >
              <div className="folder-icon">
                <FaFolder className="closeFolder" />
                <FaFolderOpen className="openFolder" />
              </div>
              <div className="folder-name">{subFolder.name}</div>
            </div>
          ))}

          {/* Files Items */}
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
        </div>

        {/* Context Menu */}
        {menuVisible && (
          <div
            className="context-menu"
            style={{ top: menuPosition.y, left: menuPosition.x }}
          >
            <ul>
              <li onClick={() => handleAction('Open')}>Open</li>
              <li onClick={() => handleAction('Rename')}>Rename</li>
              <li onClick={() => handleAction('Download')}>Download</li>
              <li onClick={() => handleAction('Delete')}>Delete</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileManager;
