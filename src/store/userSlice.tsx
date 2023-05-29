import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserProfile {
  // name: string;
  // age: number;
  email: string;
  password: string;
  login: boolean;
}

interface UserState {
  profile: UserProfile;
}

const initialState: UserState = {
  profile: {
    // name: "",
    // age: 0,
    email: "",
    password: "",
    login: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<UserProfile>) {
      state.profile = action.payload;
    },
    setLogOut(state) {
      state.profile = initialState.profile;
    },
  },
});

export const { setLogin, setLogOut } = userSlice.actions;

export default userSlice.reducer;
