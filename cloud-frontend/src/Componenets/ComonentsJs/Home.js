import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FileManager } from "@cubone/react-file-manager";
import "../ComponentsCss/Home.css";
import Terminal from "./Terminal";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    navigate('/login'); 
  };  

  return (
    <>
      <button onClick={handleLogout}>Logout</button> 
      <Terminal />
    </>
  );
}

export default Home;
