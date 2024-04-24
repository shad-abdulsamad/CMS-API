import express from "express";
import { createCategory } from "../controllers/category.controller.js";

const router = express.Router(); 
router.post("/", createCategory);

export default router;