import { NextFunction, Request, Response } from 'express';
import ApiRespose from '../utils/ApiRespose.js';
import AudioService from '../services/audio.service.js';
import range from 'range-parser';
import fs from 'fs';

class AudioController {
  /**
   * uploadVideo
   */
  public static async uploadAudio(req: Request, res: Response, next: NextFunction) {
    try {
      let result = await AudioService.upload(req.files, req.body, req.user);
      res.status(200).json(new ApiRespose(200, 'Successfully Uploaded', result));
    } catch (error) {
      next(error);
    }
  }
  public static async downloadAudio(req: Request, res: Response, next: NextFunction) {
    try {
      const file = await AudioService.play(req.query.id);
      // const rangeHeader = req.headers.range;
      // console.log(req.headers)
      // if (rangeHeader) {
      //     const ranges = range(file.size, rangeHeader);
      //     if (ranges === -1) {
      //       // Range not satisfiable
      //       res.status(416).send('Requested range not satisfiable');
      //       return;
      //     }
      //     if (Array.isArray(ranges)) {
      //         console.log("hi")
      //     // Set proper headers for partial content
      //     res.status(206);
      //     res.setHeader('Content-Range', `bytes ${ranges[0].start}-${ranges[0].end}/${file.size}`);
      //     res.setHeader('Accept-Ranges', 'bytes');
      //     res.setHeader('Content-Length', ranges[0].end - ranges[0].start + 1);

      //     // Create a readable stream from the file with specified range
      //     const fileStream = fs.createReadStream("streamed-file.mp3", { start: ranges[0].start, end: ranges[0].end });

      //     // Pipe the stream to the response
      //     fileStream.pipe(res);
      //     }
      //   } else {

      res.status(200).setHeader('Content-Length', file.size);
      file.fileStream.pipe(res);
      //   }
    } catch (error) {
      next(error);
    }
  }
}
export default AudioController;
