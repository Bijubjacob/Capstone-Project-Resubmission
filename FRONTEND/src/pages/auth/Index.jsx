import React, { useState } from 'react';
import LoginForm from '../../pages/login_form/Index';
import SignUp from '../../pages/signup_form/Index';

const AuthPage = () => {
  const [newUser, setNewUser] = useState(false); // Controls whether to show sign-up or login form

  const handleSwitchToSignUp = () => {
    setNewUser(true); // Show sign-up form
  };

  const handleSwitchToLogin = () => {
    setNewUser(false); // Show login form
  };

  return (
    <div className="auth-container">
      <h1>{newUser ? 'Sign Up' : 'Log In'}</h1>

      {/* Conditionally render SignUp or LoginForm based on newUser */}
      {newUser ? (
        <SignUp setNewUser={setNewUser} />
      ) : (
        <LoginForm setNewUser={setNewUser} />
      )}

      {/* Switch between Sign Up and Log In */}
      <div className="switch-container">
        <p>
          {newUser ? (
            <>
              Already have an account?{' '}
              <button
                onClick={handleSwitchToLogin} // Switch to login form
                aria-label="Switch to Login"
              >
                Log In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button
                onClick={handleSwitchToSignUp} // Switch to sign-up form
                className="switchButton"
              >
                Sign Up
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
