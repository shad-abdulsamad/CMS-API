import express from "express";
import { createCategory, getCategories } from "../controllers/category.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
const router = express.Router(); 

router.post("/", authenticate, authorize("ADMIN"),createCategory);
router.get("/", authenticate, authorize("ADMIN"), getCategories);

export default router;