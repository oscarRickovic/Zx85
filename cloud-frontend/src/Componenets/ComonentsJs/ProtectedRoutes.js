import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  console.log('Checking token:', token);

  if (!token) {
    alert('Access denied. Please log in.');
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
