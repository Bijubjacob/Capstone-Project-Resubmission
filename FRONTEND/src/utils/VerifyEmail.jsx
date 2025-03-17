import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const { token } = useParams();  // Get the token from the URL
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);  // Add loading state
  const [errorMessage, setErrorMessage] = useState('');  // Handle specific errors
  const navigate = useNavigate();

  useEffect(() => {
    // Log the token to verify if it's being extracted correctly
    console.log('Token:', token);

    if (token) {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/users/verify-email/${token}`) // Use import.meta.env to access VITE_API_BASE_URL
        .then((response) => {
          setMessage('Your email has been successfully verified!');
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        })
        .catch((error) => {
          if (error.response) {
            // Server responded with an error
            setErrorMessage(error.response.data.errors[0].msg || 'There was an error with your verification.');
          } else if (error.request) {
            // No response from the server
            setErrorMessage('Network error. Please try again later.');
          } else {
            // Other errors
            setErrorMessage('An unexpected error occurred.');
          }
        })
        .finally(() => {
          setIsLoading(false);  // Set loading to false once the request is complete
        });
    } else {
      setIsLoading(false);
      setErrorMessage('Invalid verification token.');
    }
  }, [token, navigate]);

  return (
    <div>
      <h2>Email Verification</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>{message || errorMessage}</p>
      )}
    </div>
  );
};

export default VerifyEmail;
