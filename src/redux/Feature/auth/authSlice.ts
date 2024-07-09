import { createSlice } from "@reduxjs/toolkit";

export interface TUser {
  user: null | object;
  token: null | string;
}
const initialState: TUser = {
  user: null,
  token: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, actions) => {
      const { user, token } = actions.payload;
      (state.user = user), (state.token = token);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const {setUser,logOut} =authSlice.actions
export default authSlice.reducer