import express from "express";
import { getSingleComment,EditCommentByAdmin,getAllComments, deleteCommentByAdmin, createCommentByAdmin, getPostsForComments } from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/", getAllComments);
router.delete("/:id", deleteCommentByAdmin);
router.post("/:id",createCommentByAdmin);
router.get("/posts", getPostsForComments);
router.put("/:id", EditCommentByAdmin);
router.get("/:id", getSingleComment);
export default router;