import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  username: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  username: null,
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<{ username: string; accessToken: string; refreshToken: string }>) => {
      state.username = action.payload.username;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
  },
});

export const { setTokens } = authSlice.actions;
export default authSlice.reducer;
