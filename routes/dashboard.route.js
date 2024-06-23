import express from "express";
import { PostsPerCategory, PostsPerUser, UserRoleDistribution, CommentPerPost, UserGrowthPerMonth, getUniqueVisitorsData, getVisitorTypeData } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/posts-per-user", PostsPerUser);
router.get("/posts-per-category",PostsPerCategory );
router.get("/user-role-distribution", UserRoleDistribution);
router.get("/comment-per-post",CommentPerPost );
router.get("/user-growth-per-month",UserGrowthPerMonth);
router.get("/unique-visitors", getUniqueVisitorsData);
router.get("/visitor-type", getVisitorTypeData);
export default router;
