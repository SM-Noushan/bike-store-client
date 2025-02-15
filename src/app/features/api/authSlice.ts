import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  email: string;
  role: string;
  iat: number;
  exp: number;
};

type TAuthState = {
  user: TUser | null;
  token: string | null;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  selectors: {
    selectCurrentUser: ({ user }) => user,
    selectCurrentToken: ({ token }) => token,
  },
});

export const { selectCurrentUser, selectCurrentToken } = authSlice.selectors;

export const { setUser, logout } = authSlice.actions;
