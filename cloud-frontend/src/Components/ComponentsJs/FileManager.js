import React, { useEffect, useState } from "react";
import "../ComponentsCss/FileManager.css";
import { FaFolder } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa";
import Folder from "../../Classes/Entities/Folder";
import File from "../../Classes/Entities/File";
import { FaFile } from "react-icons/fa";



const FileManager = () => {
    let Root = new Folder();
    let Home = new Folder("Home", Root);
    let Documents = new Folder("Documents", Root);
    let Desktop = new Folder("Desktop", Root);
    let music = new Folder("music", Documents);
    let abdelhadi = new File("abdelhadi", Desktop)
    let abdelhadi2 = new File("abdelhadi", Root)

    console.log(Root.subFiles)
    const [workingDirectory, setWorkinDirectory] = useState(Root);
    const [dividerPosition, setDividerPosition] = useState(20); // Default width of the first section is 30%
    useEffect(()=> {
        isResponsive();
    }, [])
    const isResponsive = () => {
        let res =  window.innerWidth <= 768; // respect the same value with Database
        res && setDividerPosition(0)
        return res;
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
            <div
                className="section left"
                style={{ width: `${dividerPosition}%` }}
            >
                Left Section
            </div>
            <div
                className="divider"
                onMouseDown={handleMouseDown}
            ></div>
            <div
                className="section right"
                style={{ width: `${100 - dividerPosition }%` }}
            >
                <div className = "filesPath">
                </div>
                <div className = "elements">
                    {/* Folder Items */}
                    {workingDirectory.subFolders.map((_, index) => (
                        <div key={index} className="folder" onDoubleClick={() => {setWorkinDirectory(workingDirectory.subFolders[index])}}>
                            <div className="folder-icon">
                                <FaFolder className="closeFolder"/>
                                <FaFolderOpen className="openFolder"/>
                            </div>
                            <div className="folder-name">{workingDirectory.subFolders[index].name}</div>
                        </div>
                    ))}

                    {/* Files Items */}
                    {workingDirectory.subFiles.map((_, index) => (
                        <div key={index} className="file">
                            <div className="file-icon">
                                <FaFile/>
                            </div>
                            <div className="file-name">{workingDirectory.subFiles[index].name}</div>
                        </div>
                    ))}


                </div>
            </div>
        </div>
    );
};

export default FileManager;
