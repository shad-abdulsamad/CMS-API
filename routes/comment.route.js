import express from "express";
import { createComment, deleteComment, getComments, getAllComments, deleteCommentByAdmin } from "../controllers/comment.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

router.post("/:id/comments",authenticate,createComment);
router.get("/:id/comments",getComments);
router.delete("/:postId/comments/:commentId", authenticate, authorize(["ADMIN","USER"]), deleteComment);

router.get("/", getAllComments);
router.delete("/:id", deleteCommentByAdmin);

export default router;