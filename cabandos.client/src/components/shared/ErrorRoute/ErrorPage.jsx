import React from 'react';
import { useLocation } from 'react-router-dom';

const ErrorPage = () => {
    const location = useLocation();
    const errorMessage = location.state?.errorMessage || 'Something went wrong';

    return (
        <div>
            <h1>Error</h1>
            <p>{errorMessage}</p>
        </div>
    );
};

export default ErrorPage;
