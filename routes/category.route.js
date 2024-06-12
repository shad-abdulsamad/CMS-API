import express from "express";
import { createCategory, getCategories, updateCategory, deleteCategory, updateCategoryByAdmin } from "../controllers/category.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
const router = express.Router(); 

router.post("/",createCategory);
router.get("/", getCategories);
router.put("/:id", updateCategoryByAdmin);
router.delete("/:id", deleteCategory);

export default router; 