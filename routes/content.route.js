import express from "express";
import { showPosts, getSinglePost,updateContent, deleteContent, createContentByAdmin } from "../controllers/content.controller.js";

const router = express.Router();

router.post("/", createContentByAdmin);
router.get("/",showPosts);
router.get("/:id",  getSinglePost);
router.put("/:id",  updateContent);
router.delete("/:id", deleteContent);

export default router;