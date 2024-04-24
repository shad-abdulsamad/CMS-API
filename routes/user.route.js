import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { getUsers, getSingleUser, deleteUser, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/",authenticate,authorize(["ADMIN"]), getUsers);
router.get("/:id",authenticate, getSingleUser);
router.put("/:id", authenticate, updateUser );
router.delete("/:id", authenticate, authorize(["ADMIN"]), deleteUser);

export default router;