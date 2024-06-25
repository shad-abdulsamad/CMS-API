import express from "express";
import { deleteComment, getComments, getAllComments, deleteCommentByAdmin, createCommentByAdmin, getPostsForComments } from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/:id/comments",getComments);
router.delete("/:postId/comments/:commentId", deleteComment);

router.get("/", getAllComments);
router.delete("/:id", deleteCommentByAdmin);
router.post("/:id",createCommentByAdmin);
router.get("/posts", getPostsForComments);

export default router;