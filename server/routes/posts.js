import express from "express";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//now '/' will not be reached by localhost:5000/ but will be reached at localhost:5000/posts as we mentioned in it in index.js
router.get("/", getPosts);

//Similarly adding other routes
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
