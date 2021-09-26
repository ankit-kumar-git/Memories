import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
// import express from "express";
// const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Now post request contain a thing called req.body which carry things.
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//Learn more about http status code on (https://www.restapitutorial.com/httpstatuscodes.html)

export const updatePost = async (req, res) => {
  const { id: _id } = req.params; //rename _id we received to id
  const post = req.body;
  // console.log(post);

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );

  // console.log(updatedPost);
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  //Validating the id
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  //Checking whether user is loggedin or not using req.userId received from auth middleware
  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with id");

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    //like the post
    post.likes.push(req.userId);
  } else {
    //dislike the post(basically unlike);
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};
