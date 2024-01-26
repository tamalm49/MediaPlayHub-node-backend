import {NextFunction, Request, Response } from "express";
import ApiRespose from "../utils/ApiRespose.js";
import AudioService from "../services/audio.service.js";

class AudioController {
    /**
     * uploadVideo
     */
    public static async uploadAudio(req : Request , res : Response , next : NextFunction) {
        try {
            let result = await AudioService.upload(req.files,req.body,req.user);
            res.status(200).json(new ApiRespose(200,"Successfully Uploaded",result));
        } catch (error) {
            next(error);
        }
    }
}
export default AudioController;