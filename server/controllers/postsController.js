import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    // res.send("Bitch")
    const postsMessage = await PostMessage.find();
    postsMessage
      ? res.status(200).json(postsMessage)
      : res.status(500).json({ message: "Server Error" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();
    newPost
      ? res.status(201).json(newPost)
      : res.status(500).json({ message: "Server Error" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No Post Found With That Id");
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { ...post, _id: id },
    {
      new: true,
    }
  );
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No Post Found With That Id");
  }
  await PostMessage.findByIdAndRemove(id);
  res.json({ message: "Post Deleted Successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No Post Found With That Id");
  }

  const post = await PostMessage.findById(id);
  const indexOfLike = post.likes.findIndex((id) => id === String(req.userId));
  if (indexOfLike === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
};
