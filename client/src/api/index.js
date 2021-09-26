import axios from "axios";

//we are creating an axios instance with baseURL. So write API inplace of axios and jus give endpoints and not whole url.

const API = axios.create({ baseURL: "https://memories-14.herokuapp.com" });

// const API = axios.create({ baseURL: "https://localhost:5000" });

//This will be exwcured before making requests. Basically we are passig the token from frontend to backened(basically) to auth middleware so that it can authorize before request to do something is made and we can act accordingly
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

// const url = "https://memories-14.herokuapp.com/posts";

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post("/user/signIn", formData);
export const signUp = (formData) => API.post("/user/signUp", formData);
