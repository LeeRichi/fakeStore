import React from 'react'
import { TextField, Button, Link, Box, Typography } from "@mui/material";
import { setLogOut } from '../store/userSlice'
import { useDispatch, useSelector } from "react-redux";


const ProfilePage = () =>
{
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user)
  const email = state.profile.email

  console.log(state.profile.email)

  const handleLogin = () => {
    dispatch(setLogOut());
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Welcome back {email}
      </Typography>
      <Button variant="contained" onClick={handleLogin}>
        Log Out
      </Button>
    </div>
    
  )
}

export default ProfilePage