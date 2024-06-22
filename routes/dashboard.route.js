import express from "express";
import { PostsPerCategory, PostsPerUser } from "../controllers/dashboard.controller.js";
const router = express.Router();

router.get("/posts-per-user", PostsPerUser);
router.get("/posts-per-category",PostsPerCategory );

export default router;
