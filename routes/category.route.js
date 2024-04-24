import express from "express";
import { createCategory } from "../controllers/category.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
const router = express.Router(); 

router.post("/", authenticate, authorize("ADMIN"),createCategory);

export default router;