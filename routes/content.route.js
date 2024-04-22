import express from "express";
import { createContent } from "../controllers/content.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

router.post("/",createContent);

export default router;