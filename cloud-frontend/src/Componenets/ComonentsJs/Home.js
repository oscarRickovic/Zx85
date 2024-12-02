import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FileManager } from "@cubone/react-file-manager";
import "@cubone/react-file-manager/dist/style.css";
import "../ComponentsCss/Home.css";
import Terminal from "./Terminal";
import axios from "axios";

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

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Home component RENDER....")
    const fetchDashboardData = async () => {
      console.log('fetchdashboarddata....')
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('You must be logged in to access the dashboard.');
        navigate('/login'); // Redirect to login if no token
        return;
      } else{
        console.log('token found: ', token);
      }
/*
      try {
        const response = await axios.get('http://localhost:5000/api/auth/home', {
          headers: { Authorization: token },
        });
        alert(response.data.message);
      } catch (error) {
        if (error.response?.status === 401) {
          alert('Session expired or unauthorized access. Please log in again.');
          localStorage.removeItem('authToken');
          navigate('/login');
        } else {
          console.log('An error occurred. Please try again later.', error);
        }
      }*/
    };

    fetchDashboardData();
  }, [navigate]);

  // Custom function to handle folder creation
  const handleCreateFolder = (newFolderName, parentPath) => {
    console.log(parentPath)
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

  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    navigate('/login'); 
  };  

  return (
    <>
      <FileManager files={files} onCreateFolder={handleCreateFolder} />
      <button onClick={handleLogout}>Logout</button> 
      <Terminal />
    </>
  );
}

export default Home;
