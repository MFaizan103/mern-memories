import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});
// Post Related API
const postsEndpoint = "/posts";

export const fetchPosts = async () => {
  const res = await API.get(postsEndpoint);
  return res.data;
};

export const newPost = async (newPost) => {
  const res = await API.post(postsEndpoint, newPost);
  return res.data;
};

export const updatePost = async (id, updatedPost) => {
  const res = await API.patch(`${postsEndpoint}/${id}`, updatedPost);

  return res.data;
};
export const deletePost = async (id) => {
  await API.delete(`${postsEndpoint}/${id}`);
};

export const likePost = async (id) => {
  const res = await API.patch(`${postsEndpoint}/${id}/likePost`);
  return res.data;
};
// Post Related API //

// User Related API

const userSignInEndPoint = "/user/signin";
const userSignUpEndPoint = "/user/signup";
export const signIn = async (formData) => {
  const res = await API.post(userSignInEndPoint, formData);
  return res.data;
};
export const signUp = async (formData) => {
  const res = await API.post(userSignUpEndPoint, formData);
  return res.data;
};

// User Related API
