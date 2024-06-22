import express from "express";
import { PostsPerCategory, PostsPerUser, UserRoleDistribution } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/posts-per-user", PostsPerUser);
router.get("/posts-per-category",PostsPerCategory );
router.get("/user-role-distribution", UserRoleDistribution);

export default router;
