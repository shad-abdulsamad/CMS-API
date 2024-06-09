import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { getUsers, getSingleUser, deleteUser, updateUser, createUserByAdmin } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUserByAdmin);
router.get("/", getUsers);
router.get("/:id",authenticate, getSingleUser);
router.put("/:id", authenticate, updateUser );
router.delete("/:id", deleteUser);

export default router;