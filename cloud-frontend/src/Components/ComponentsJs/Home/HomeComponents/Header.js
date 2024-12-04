import React, { useState, useEffect } from 'react';
import "../../../ComponentsCss/Header.css"
import { useNavigate } from 'react-router-dom'
function Header() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('authToken'); 
        navigate('/login'); 
      }; 
    return (
        <div className="header">
            <div className="header-left">
                <p>{email}</p>
            </div>
            <div className="header-right">
                <p onClick={handleLogout}>Logout</p>
            </div>
        </div>
    );
}

export default Header