import { Router } from "express";
import { UserConntroller } from "../controllers/user.controller.js";
import { upload } from "../middleware/uploader.multer.js";
import { authenticate } from "../middleware/auth.handler.js";
const router = Router();
const uploader = upload.single("avatar");//.fields([{ name: 'avatar', maxCount: 1 }, { name: 'cover', maxCount: 1 }])
router.get("/getuser",authenticate, UserConntroller.getUser);
router.post("/registration", uploader, UserConntroller.saveUser);
router.put("/update", UserConntroller.updateUser);
router.post("/login",UserConntroller.login);
router.delete("/logout",UserConntroller.logout);
export default router;