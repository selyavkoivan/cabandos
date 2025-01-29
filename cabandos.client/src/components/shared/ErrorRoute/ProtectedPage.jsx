import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedPage = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/secure-endpoint')
            .then((response) => {
                if (response.status === 403) {
                    navigate('/error', { state: { errorMessage: 'Access Denied' } });
                }
            })
            .catch(() => {
                navigate('/error', { state: { errorMessage: 'An error occurred' } });
            });
    }, [navigate]);

    return <div>Protected Content</div>;
};

export default ProtectedPage;
