import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: null,
  refresh_token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
