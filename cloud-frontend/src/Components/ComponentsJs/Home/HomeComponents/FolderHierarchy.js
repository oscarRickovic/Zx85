import React, { useState } from "react";
import { FaFolder } from "react-icons/fa";
import { CiFileOn } from "react-icons/ci";
import "../../../ComponentsCss/FolderHierarchy.css";

const FolderHierarchy = ({ folder, setWorkingDirectory }) => {
    const [isOpen, setIsOpen] = useState(false); // Track folder toggle state

    // Toggle folder open/close
    const toggleFolder = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="folder-hierarchy">
            {/* Render the Parent Folder */}
            <div className="folder-item">
                <div
                    className="folder-name"
                    onClick={() => {
                        setWorkingDirectory(folder);
                        toggleFolder(); // Toggle subfolders visibility
                    }}
                >
                    {/* Change folder icon based on toggle state */}
                    <FaFolder className="icon" style={{ display: isOpen ? "none" : "inline" }} />
                    <FaFolder className="icon-open" style={{ display: isOpen ? "inline" : "none" }} />{" "}
                    {folder.name}
                </div>
            </div>

            {/* Conditionally Render Subfolders and Files */}
            {isOpen && (
                <div className="subfolder">
                    {/* Render Subfolders Recursively */}
                    {folder.subFolders.map((subFolder, index) => (
                        <FolderHierarchy
                            key={index}
                            folder={subFolder}
                            setWorkingDirectory={setWorkingDirectory}
                        />
                    ))}

                    {/* Render Files */}
                    {folder.subFiles.map((file, index) => (
                        <div key={index} className="file-item">
                            <CiFileOn className="icon" /> {file.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FolderHierarchy;
