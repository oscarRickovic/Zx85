import React, { useEffect, useState } from "react";
import "../ComponentsCss/FileManager.css";

const FileManager = () => {
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
            </div>
        </div>
    );
};

export default FileManager;
