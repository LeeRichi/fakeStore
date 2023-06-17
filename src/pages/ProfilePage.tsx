import React, { useState } from 'react'
import { TextField, Button, Link, Box, Typography } from "@mui/material";
import { setLogOut } from '../store/userSlice'
import { useDispatch, useSelector } from "react-redux";

import {Add, Delete, Edit} from '../components/Admin/index'

interface UserProfile {
  email: string;
  password: string;
  login: boolean;
  position: string;
}

interface ProfileProps {
  profile: UserProfile;
}

interface UserState
{
  user: ProfileProps
}

const ProfilePage = () =>
{
  const [showAdd, setShowAdd] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  const [showEdit, setShowEdit] = useState(false)

  const dispatch = useDispatch();
  const state = useSelector((state: UserState) => state.user)
  const email = state.profile.email

  console.log(state.profile)

  const handleLogin = () => {
    dispatch(setLogOut());
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Welcome back {email}
      </Typography>
      {/* temporary solution Jun 15, 2023 */}
      {state.profile.email !== 'admin@gmail.com' ? 
        <div>Welcome back, member</div> :  
        <div>
          <div>hi admin</div>
          <Button onClick={() =>
          {
            setShowAdd((prev) => !prev);
            setShowDelete(false);
            setShowEdit(false);
          }}
          style={showAdd ? { backgroundColor: 'rgba(128, 128, 128, 0.3)' } : undefined}
          >
            add new product</Button>
          <Button onClick={() =>
          {
            setShowDelete((prev) => !prev);
            setShowAdd(false);
            setShowEdit(false);
          }}
            style={showDelete ? { backgroundColor: 'rgba(128, 128, 128, 0.3)' } : undefined}
          >
            delete product</Button>
          <Button onClick={() =>
          {
            setShowEdit((prev) => !prev);
            setShowAdd(false);
            setShowDelete(false);
          }}
          style={showEdit ? { backgroundColor: 'rgba(128, 128, 128, 0.3)' } : undefined}
          >
            edit product</Button>
          {showAdd ? <Add /> : null}
          {showEdit ? <Edit /> : null}
          {showDelete ? <Delete /> : null}
        </div>
      }
     
      
      <Button variant="contained" onClick={handleLogin} style={{marginTop: '10vh'}}>
        Log Out
      </Button>
    </div>
    
  )
}

export default ProfilePage