import express from "express";
import { getSinglePost,updateContent, createContentByAdmin, getPosts, deleteContentByAdmin } from "../controllers/content.controller.js";

const router = express.Router();

router.post("/", createContentByAdmin);
router.get("/",getPosts);
router.get("/:id", getSinglePost);
router.put("/:id",  updateContent);
router.delete("/:id", deleteContentByAdmin);


export default router;