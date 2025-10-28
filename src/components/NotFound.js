import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
            <h1 className="display-3 fw-bold text-danger">404</h1>
            <h3 className="mb-3">Oops! Page Not Found </h3>
            <p className="text-secondary mb-4">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="btn bg-color">
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
