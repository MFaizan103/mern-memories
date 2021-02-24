import { createSlice } from "@reduxjs/toolkit";
import * as api from "../api/index";

export const postsListSlice = createSlice({
  name: "postsList",
  initialState: { data: [], isloading: true },
  reducers: {
    fetchAllPostsAction: (state, action) => {
      state.data = action.payload;
      state.isloading = false;
    },
    createPostAction: (state, action) => {
      state.data.push(action.payload);
    },
    updatePostAction: (state, action) => {
      state.data = state.data.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
    deletePostAction: (state, action) => {
      state.data = state.data.filter((post) => post._id !== action.payload);
    },
    likePostAction: (state, action) => {
      state.data = state.data.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    },
  },
});

export const {
  fetchAllPostsAction,
  createPostAction,
  updatePostAction,
  deletePostAction,
  likePostAction,
} = postsListSlice.actions;

// THUNK FUNCTIONS ASYNC
export const getPostsAsync = () => async (dispatch) => {
  try {
    const data = await api.fetchPosts();
    dispatch(fetchAllPostsAction(data));
  } catch (error) {
    console.log(error);
  }
};
export const createPostsAsync = (post) => async (dispatch) => {
  try {
    const data = await api.newPost(post);
    dispatch(createPostAction(data));
  } catch (error) {
    console.log(error);
  }
};
export const updatePostAsync = (id, updatedPost) => async (dispatch) => {
  try {
    const data = await api.updatePost(id, updatedPost);
    dispatch(updatePostAction(data));
  } catch (error) {
    console.log(error);
  }
};
export const deletePostAsync = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch(deletePostAction(id));
  } catch (error) {
    console.log(error);
  }
};

export const likePostAsync = (id) => async (dispatch) => {
  try {
    const data = await api.likePost(id);
    dispatch(likePostAction(data));
  } catch (error) {
    console.log(error);
  }
};

// THUNK FUNCTIONS ASYNC //

export default postsListSlice.reducer;
