import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, roleRequired }) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
  
    if (!token) {
      return <Navigate to="/access" />;
    }
  
    if (role !== roleRequired) {
      return <Navigate to="/access" />;
    }
  
    return children;
  }
  

  export default ProtectedRoute;
  