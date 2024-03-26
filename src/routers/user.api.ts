import { Router } from 'express';
import { UserConntroller } from '../controllers/user.controller.js';
import { upload } from '../middleware/uploader.multer.js';
import { authenticate } from '../middleware/auth.handler.js';
import VideoController from '../controllers/video.controller.js';
const userrouter = Router();
// const uploader = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'cover', maxCount: 1 }])
userrouter.get('/getuser', authenticate, UserConntroller.getUser);
userrouter.post('/registration', upload.single('avatar'), UserConntroller.saveUser);
userrouter.put('/update', UserConntroller.updateUser);
userrouter.post('/login', UserConntroller.login);
userrouter.delete('/logout', UserConntroller.logout);
userrouter.post('/uploadvideo', authenticate, upload.single('video'), VideoController.uploadVideo);
export default userrouter;
