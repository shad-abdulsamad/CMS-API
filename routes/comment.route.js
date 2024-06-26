import express from "express";
import { deleteMultipleCommentsByAdmin,EditCommentByAdmin, createCommentByAdmin, deleteCommentByAdmin, getAllComments, getPostsForComments, getSingleComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/", getAllComments);
router.delete("/:id", deleteCommentByAdmin);
router.post("/:id",createCommentByAdmin);
router.get("/posts", getPostsForComments);
router.put("/:id", EditCommentByAdmin);
router.get("/:id", getSingleComment);
router.delete("/", deleteMultipleCommentsByAdmin);
export default router;