import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserProfile {
  email: string;
  password: string;
  login: boolean;
  position: 'admin' | 'member';
}

export interface UserState {
  profile: UserProfile;
}

const initialState: UserState = {
  profile: {
    email: "",
    password: "",
    login: false,
    position: "member"
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
