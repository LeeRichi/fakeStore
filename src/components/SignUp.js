import React, { useState } from "react";
import { TextField, Button, Link, Box, Typography } from "@mui/material";
import firebase from '../firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";

import auth from "../firebaseConfig";

// type SignUpProps = {
//   setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
// };

// const SignUp: React.FC<SignUpProps> = ({ setSignUp }) =>
const SignUp = ({ setSignUp }) =>
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = () =>
    {
        setSignUp((prev) => !prev);
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User sign-up successful
            const user = userCredential.user;
            console.log('User signed up:', user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('Sign-up error:', error, errorCode, errorMessage);
        });
    }

  return (
    <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
    >
        <Typography variant="h4" gutterBottom>
            Sign Up
        </Typography>
        <TextField
        label="Email"
        value={email}
            //   onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange={(e) =>

            setEmail(e.target.value)
        }
        margin="normal"
        sx={{ width: '500px' }}
        />
        <TextField
        label="Password"
        value={password}
        // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onChange={(e) =>

            setPassword(e.target.value)
        }
        type="password"
        margin="normal"
        sx={{ width: '500px' }}
        />
        <Button variant="contained" onClick={handleSignUp}>
            Sign Up
        </Button>
    </Box>
  )
}
 
export default SignUp