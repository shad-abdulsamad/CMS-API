import express from "express";
import { createUserByAdmin, deleteUser, getSingleUser, getUsers, updateUser, updateUserByAdmin, deleteUserByAdmin } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUserByAdmin);
router.get("/", getUsers);
router.get("/:id", getSingleUser);
router.put("/:id", updateUser );
router.put("/admin/:id", updateUserByAdmin);
router.delete("/admin/:id", deleteUserByAdmin);
router.delete("/:id", deleteUser);

export default router;