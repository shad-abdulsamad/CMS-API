import express from "express";
import { createComment } from "../controllers/comment.controller.js";
import { authenticate } from "../middleware/authenticate.js";
const router = express.Router();

router.post("/:id/comments",authenticate,createComment);

export default router;