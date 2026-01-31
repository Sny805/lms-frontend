import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  status: "idle", // 👈 NEW
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    authLoading: (state) => {
      state.status = "loading";
    },
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.status = "authenticated";
    },
    userLoggedOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = "unauthenticated";
    },
  },
});

export const {
  authLoading,
  userLoggedIn,
  userLoggedOut,
} = authSlice.actions;

export default authSlice.reducer;
