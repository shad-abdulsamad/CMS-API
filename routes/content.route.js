import express from "express";
import { createContent, showPosts, getSinglePost,updateContent } from "../controllers/content.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.post("/", authenticate,createContent);
router.get("/", authenticate ,showPosts);
router.get("/:id", authenticate, getSinglePost);
router.put("/:id", authenticate, updateContent);

export default router;