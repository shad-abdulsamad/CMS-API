import express from "express";
import {  getCategories, updateCategoryByAdmin, deleteCategoryByAdmin, bulkDeleteCategories, createCategoryByAdmin } from "../controllers/category.controller.js";
const router = express.Router(); 

router.post("/",createCategoryByAdmin);
router.get("/", getCategories);
router.put("/:id", updateCategoryByAdmin);
router.delete("/:id", deleteCategoryByAdmin);
router.post("/bulk-delete", bulkDeleteCategories);
export default router; 