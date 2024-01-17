import { Router } from "express";
import { UserConntroller } from "../controllers/user.controller.js";
const router = Router();
router.get("/", UserConntroller.getAllUser);
router.post("/registration", UserConntroller.saveUser);
router.put("/update", UserConntroller.updateUser);
export default router;