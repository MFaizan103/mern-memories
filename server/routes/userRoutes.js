import express from "express";
const router = express.Router();
import { signIn, signUp } from "../controllers/userController.js";

// router.get("/", getPosts);
router.post("/signin", signIn);
router.post("/signup", signUp);
// router.patch("/:id", updatePost);
// router.delete("/:id", deletePost);
// router.patch("/:id/likePost", likePost);

export default router;
