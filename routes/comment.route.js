import express from "express";
import { createComment, getComments } from "../controllers/comment.controller.js";
import { authenticate } from "../middleware/authenticate.js";
const router = express.Router();

router.post("/:id/comments",authenticate,createComment);
router.get("/:id/comments",authenticate,getComments);

export default router;