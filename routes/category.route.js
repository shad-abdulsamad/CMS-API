import express from "express";
import { createCategory, getCategories, updateCategory } from "../controllers/category.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
const router = express.Router(); 

router.post("/", authenticate, authorize("ADMIN"),createCategory);
router.get("/", authenticate, authorize("ADMIN"), getCategories);
router.put("/:id", authenticate,authorize("ADMIN"), updateCategory);

export default router;