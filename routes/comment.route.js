import express from "express";
import { createComment, deleteComment, getComments } from "../controllers/comment.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

router.post("/:id/comments",authenticate,createComment);
router.get("/:id/comments",authenticate,getComments);
router.delete("/:postId/comments/:commentId", authenticate, authorize(["ADMIN","USER"]), deleteComment);

export default router;