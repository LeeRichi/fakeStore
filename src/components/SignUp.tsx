import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
// import firebase from '../firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import auth from "../firebaseConfig";
import { log } from "console";

type SignUpProps = {
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignUp: React.FC<SignUpProps> = ({ setSignUp }) => 
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const firestore = getFirestore();

    // const handleSignUp = () => {
    //     setSignUp((prev) => !prev);
    //     createUserWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //     // User sign-up successful
    //     const user = userCredential.user;

        // Set the user's role to 'admin'
        // const userProfile = {
        //     email: user.email,
        //     password: '', // It's not recommended to store passwords in plain text
        //     login: true,
        //     position: 'admin'
        // };

        // console.log('User profile before saving:', userProfile);

        // Save the user's profile with the 'admin' role in Firestore
        // addDoc(collection(firestore, "userProfiles"), userProfile)
        //     .then(() => {
        //     console.log("User profile saved successfully.");
        //     console.log("Position:", userProfile.position); // Console out the position
        //     })
        //     .catch((error) => {
        //     console.error("Error saving user profile:", error);
        //     });

        // console.log('User signed up:', user);
        // })
        // .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log('Sign-up error:', error, errorCode, errorMessage);
        // });
    // };

    const handleSignUp = () =>
    {
        setSignUp((prev) => !prev);
        // createUserWithEmailAndPassword(auth, email, password)
        // .then((userCredential) => {
        //     // User sign-up successful
        //     const user = userCredential.user;
        //     console.log('User signed up:', user);
        //     console.log(user.email);
            
        // })
        // .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     console.log('Sign-up error:', error, errorCode, errorMessage);
        // });
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User sign-up successful
            const user = userCredential.user;

            // Set the user's role to 'admin'
            const userProfile = {
                email: user.email,
                password: '', // It's not recommended to store passwords in plain text
                login: true,
                position: 'admin'
            };

            // Save the user's profile with the 'admin' role in Firestore
            addDoc(collection(firestore, "userProfiles"), userProfile)
            .then(() => {
                console.log("User profile saved successfully.");
                console.log("Position:", userProfile.position);
            })
            .catch((error) => {
                console.error("Error saving user profile:", error);
            });
            
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
            onChange={(e) =>
            setEmail(e.target.value)
        }
        margin="normal"
        sx={{ width: '500px' }}
        />
        <TextField
        label="Password"
        value={password}
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