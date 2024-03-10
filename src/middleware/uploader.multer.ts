import { Request } from 'express';
import multer, { MulterError } from 'multer';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp');
  },
  filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname);
  }
});
const whiteListedVideoType: string | string[] = ['video/x-matroska', 'video/mp4'];
const whiteListedVideoextension: string | string[] = ['mkv', 'mp4'];
const whiteListedAudioType: string | string[] = ['audio/mpeg', 'audio/mp3'];
const whiteListedAudioextension: string | string[] = ['mp3'];
const whiteListedimgextension: string | string[] = ['image/png'];
const whiteListedimgType: string | string[] = ['png'];
const fileFilter = function (req: Request, file: Express.Multer.File, cb: any) {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:
  let extension: string | string[] = file.originalname.split('.');
  extension = extension[extension.length - 1];
  console.log(file);
  if (whiteListedAudioType.includes(file.mimetype) && whiteListedAudioextension.includes(extension) && file.fieldname === 'audio') {
    cb(null, true);
  } else if (whiteListedVideoType.includes(file.mimetype) && whiteListedVideoextension.includes(extension) && file.fieldname === 'video') {
    cb(null, true);
  } else if (whiteListedimgType.includes(file.mimetype) && whiteListedimgextension.includes(extension) && file.fieldname === 'thumbnail') {
    cb(null, true);
  } else {
    cb(new MulterError('LIMIT_UNEXPECTED_FILE'));
  }
};
export const upload = multer({ storage });
