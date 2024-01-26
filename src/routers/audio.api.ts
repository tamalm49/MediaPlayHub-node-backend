import { Router } from "express";
import AudioController from "../controllers/audio.controller.js";
import { upload } from "../middleware/uploader.multer.js";
const audioRouter = Router();
const uploader = upload.fields([{ name: 'audio', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }])
audioRouter.post("/uploadaudio",uploader,AudioController.uploadAudio);
export default audioRouter;