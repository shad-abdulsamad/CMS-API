import express from "express";
import { createContent, showPosts, getSinglePost,updateContent, deleteContent } from "../controllers/content.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.post("/", authenticate,createContent);
router.get("/", authenticate ,showPosts);
router.get("/:id", authenticate, getSinglePost);
router.put("/:id", authenticate, updateContent);
router.delete("/:id", authenticate, deleteContent);

export default router;