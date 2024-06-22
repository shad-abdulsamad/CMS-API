import express from "express";
import { PostsPerCategory, PostsPerUser, UserRoleDistribution, CommentPerPost } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/posts-per-user", PostsPerUser);
router.get("/posts-per-category",PostsPerCategory );
router.get("/user-role-distribution", UserRoleDistribution);
router.get("/comment-per-post",CommentPerPost );
export default router;
