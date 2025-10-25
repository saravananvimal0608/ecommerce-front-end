import React from 'react'
import { Navigate } from 'react-router-dom';

const IsAdmin = ({ children }) => {

    const data = JSON.parse(localStorage.getItem("user"))
    return data.isAdmin ? children : <Navigate to="/login" replace />
}

export default IsAdmin