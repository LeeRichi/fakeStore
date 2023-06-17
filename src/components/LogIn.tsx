import React, { useState } from "react";
import { TextField, Button, Link, Box, Typography } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setLogin } from "../store/userSlice";
import { useDispatch } from "react-redux";

import { GoogleOAuthProvider, GoogleLogin, CredentialResponse, GoogleCredentialResponse } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

import SignUp from "./SignUp";

interface JwtPayload {
  email: string;
  password: string;
}

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState(false)

  const dispatch = useDispatch();

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User login successful
        const user = userCredential.user;
        console.log("User logged in:", user);
        // Dispatch the setLogin action
        dispatch(setLogin({ email: email, password: password, login: true, position: "member" }));
      })
      .catch((error) => {
        // Handle login error
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Login error:", error);
        // Handle the error or display an error message to the user
      });
  };

  const handleForgetPassword = () => {
    // Handle forget password logic here
    console.log("Forgot password?");
  };

  const handleSignUp = () =>
  {
    setSignUp((prevState) => !prevState);
  };

  function handleLoginSuccess(credentialResponse: GoogleCredentialResponse) {
    const credential = credentialResponse.credential;
    if (credential) {
      const userObject: JwtPayload = jwt_decode(credential)
      console.log(userObject)
      setEmail(userObject.email)
      dispatch(setLogin({ email: userObject.email, password: password, login: true, position: "member" }));
    }
  }

  const handleLoginError = () => {
    console.log('Login failed');
  };

  return (
    <>
      {signUp ?
        <SignUp setSignUp={setSignUp} /> :
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
        >
          <Typography variant="h4" gutterBottom>
            Log In
          </Typography>
          <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID!}>
            <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
          </GoogleOAuthProvider> 
          <TextField
            label="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            margin="normal"
            sx={{ width: '500px' }}
          />
          <TextField
            label="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            type="password"
            margin="normal"
            sx={{ width: '500px' }}
          />
          <Button variant="contained" onClick={handleLogin}>
            Log In
          </Button>
          <Box mt={2}>
            <Link href="#" onClick={handleForgetPassword}>
              Forgot Password?
            </Link>
          </Box>
          <Box mt={1}>
            <Link href="#" onClick={handleSignUp}>
              Sign Up
            </Link>
          </Box>
        </Box>}
    </>
  );
};

export default LogIn;
