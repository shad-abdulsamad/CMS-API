import express from "express";
import { createCategory, getCategories, updateCategoryByAdmin, deleteCategoryByAdmin, bulkDeleteCategories } from "../controllers/category.controller.js";
const router = express.Router(); 

router.post("/",createCategory);
router.get("/", getCategories);
router.put("/:id", updateCategoryByAdmin);
router.delete("/:id", deleteCategoryByAdmin);
router.post("/bulk-delete", bulkDeleteCategories);
export default router; 