import React, { useState } from 'react';
import SignUp from '../../components/signup_form/Index';
import LoginForm from "../../components/login_form/Index"

const Auth = () => {
  const [newUser, setNewUser] = useState(false);
  return (
    <>
      {newUser ? (
        <SignUp setNewUser={setNewUser} />
      ) : (
        <LoginForm setNewUser={setNewUser} />
      )}
    </>
  );
};

export default Auth;