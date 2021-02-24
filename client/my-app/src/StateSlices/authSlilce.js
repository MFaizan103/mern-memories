import { createSlice } from "@reduxjs/toolkit";
import * as api from "../api/index";
export const authSlice = createSlice({
  name: "Auth",
  initialState: { authData: null },
  reducers: {
    authAction: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      state.authData = action?.payload;
    },
    logOutAction: (state) => {
      localStorage.clear();
      return state;
    },
  },
});

export const { authAction, logOutAction } = authSlice.actions;

export const signUpAsync = (formData, history) => async (dispatch) => {
  try {
    const data = await api.signUp(formData);
    dispatch(authAction(data));
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
export const signInAsync = (formData, history) => async (dispatch) => {
  try {
    const data = await api.signIn(formData);
    dispatch(authAction(data));
    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export default authSlice.reducer;
