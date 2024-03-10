import { NextFunction, Request, Response } from 'express';
import VideoService from '../services/video.service.js';
import ApiRespose from '../utils/ApiRespose.js';

class VideoController {
  /**
   * uploadVideo
   */
  public static async uploadVideo(req: Request, res: Response, next: NextFunction) {
    try {
      let result = await VideoService.upload(req.file);
      res.status(200).json(new ApiRespose(200, 'Successfully Uploaded', result));
    } catch (error) {
      next(error);
    }
  }
}
export default VideoController;
