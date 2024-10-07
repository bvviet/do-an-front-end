import { createSlice } from "@reduxjs/toolkit";
import { userType } from "@/types/user";

interface AuthState {
  access_token: string | null;
  refresh_token: string | null;
  userInfo: userType | null;
}

const initialState: AuthState = {
  access_token: null,
  refresh_token: null,
  userInfo: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
    },
    logout: () => {
      return initialState;
    },
    saveUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { login, logout, saveUserInfo } = authSlice.actions;
export default authSlice.reducer;
