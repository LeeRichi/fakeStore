import React, { useState } from "react";
import { TextField, Button, Link, Box, Typography } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setLogin } from "../store/userSlice";
import { useDispatch } from "react-redux";

import SignUp from "./SignUp";




const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUp, setSignUp] = useState(false)

  const dispatch = useDispatch();

  // const handleLogin = () => {
  //   // Perform login logic here
  //   dispatch(setLogin({ email: email, password: password, login: true }));
  // };

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User login successful
        const user = userCredential.user;
        console.log("User logged in:", user);
        // Dispatch the setLogin action
        dispatch(setLogin({ email: email, password: password, login: true }));
        // Perform any additional actions after successful login
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
    console.log(signUp)
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
