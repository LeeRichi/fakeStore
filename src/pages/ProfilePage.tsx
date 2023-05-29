import React from 'react'
import { TextField, Button, Link, Box } from "@mui/material";
import { setLogOut } from '../store/userSlice'
import { useDispatch } from "react-redux";


const ProfilePage = () =>
{
  const dispatch = useDispatch();

  const handleLogin = () => {
    // Perform login logic here
    dispatch(setLogOut());
  };

  return (
    <div>
      <Button variant="contained" onClick={handleLogin}>
        Log Out
      </Button>
    </div>
    
  )
}

export default ProfilePage