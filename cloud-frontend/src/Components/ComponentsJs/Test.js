import React, { useState } from 'react';
import "../ComponentsCss/Test.css";

function Test() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  // Function to handle right-click event
  const handleRightClick = (e) => {
    e.preventDefault();  // Prevent default context menu
    const { clientX, clientY } = e;
    setMenuPosition({ x: clientX, y: clientY });
    setMenuVisible(true);
  };

  // Function to handle clicking outside the menu to close it
  const handleClickOutside = (e) => {
    if (menuVisible && !e.target.closest('.context-menu')) {
      setMenuVisible(false);
    }
  };

  // Add event listener to close menu when clicking outside
  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuVisible]);

  return (
    <div className="Test">
      <div className="top-div" onContextMenu={handleRightClick}>
        {/* The right-click area */}
      </div>
      <div className="home-div">
        <h1>Test</h1>
      </div>

      {menuVisible && (
        <div
          className="context-menu"
          style={{ top: menuPosition.y, left: menuPosition.x }}
        >
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Test;
