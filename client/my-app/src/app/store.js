import { configureStore } from "@reduxjs/toolkit";
import postsList from "../StateSlices/postsListSlice";
import auth from "../StateSlices/authSlilce";
import idState from "../StateSlices/idSlice";

export default configureStore({
  reducer: {
    postsList,
    auth,
    idState,
  },
});
