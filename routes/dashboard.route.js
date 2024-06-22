import express from "express";
import { PostsPerUser } from "../controllers/dashboard.controller.js";
const router = express.Router();

router.get("/", PostsPerUser);

export default router;