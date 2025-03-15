import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            console.log('Verification token:', token); // Log the token received in the URL

            fetch(`${process.env.REACT_APP_API_URL}/api/users/verify-email/${token}`)
                .then(response => {
                    console.log('Backend response status:', response.status); // Log status code
                    return response.json();
                })
                .then(data => {
                    console.log('Backend response data:', data); // Log response data
                    if (data.success) {
                        setIsVerified(true);
                    } else {
                        setErrorMessage(data.errors[0].msg || 'Verification failed, please try again.');
                    }
                })
                .catch(err => {
                    console.error('Error during verification:', err); // Log any errors
                    setErrorMessage('There was an error with the verification process.');
                });
        }
    }, [location.search]);

    return (
        <div>
            <h2>Email Verification</h2>
            {isVerified ? (
                <div>
                    <p>Your email has been successfully verified!</p>
                    <button onClick={() => navigate('/login')}>Go to Login</button>
                </div>
            ) : (
                <div>
                    <p>{errorMessage}</p>
                </div>
            )}
        </div>
    );
};

export default VerifyEmail;
