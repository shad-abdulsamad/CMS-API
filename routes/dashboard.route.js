import express from "express";
import { PostsPerUser } from "../controllers/dashboard.controller.js";
const router = express.Router();

router.get("/posts-per-user", PostsPerUser);

export default router;
