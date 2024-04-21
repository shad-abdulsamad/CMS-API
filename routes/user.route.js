import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { getUsers, getSingleUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/",authenticate,authorize("ADMIN"), getUsers);
router.get("/:id",authenticate, getSingleUser);

export default router;