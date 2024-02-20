import { Audio } from "../models/audio.model.js";
import { downStreamFromCloudinary, uploadStreamToCloudinary, uploadToCloudinary } from "../utils/couldinary.config.js";
import { CustomError } from "../utils/error.handler.js";
import { downloadByAxios } from "../utils/downloadStream.js";
import fs from 'fs';

class AudioService {
    /**
     * static async upload
     */
    public static async upload(files: any,body : any,user: any) {
        try {
            let cloudResult = await uploadStreamToCloudinary(files["audio"][0].path,files.originalname,"audio");
            if(!cloudResult) throw new CustomError("Audio Upload Failed",500);
            let thumbnailResult = await uploadToCloudinary(files["thumbnail"][0].path,"thumbnail");
            let audioUpload = Audio.create({
                audioFile : cloudResult?.asset_id,
                description:body.description,
                Artist : body.artist,
                owner : user?.use_id,
                keyword : body?.keyword,
                duration : cloudResult?.duration,
                thimbnail : thumbnailResult?.asset_id
            })
            return audioUpload;
        } catch (error) {
            throw error;
        }   
    }
    public static async play(id :any) {
        try {
            let audioAsset = await Audio.findById(id);
            if(!audioAsset) throw new CustomError("Audio Not Found", 400);
            let asset = await downStreamFromCloudinary(audioAsset.audioFile);
            if(!asset) throw new CustomError("File Not Found",404);
            let result = await downloadByAxios(asset.resources[0].secure_url);
            let fileStream = fs.createReadStream("streamed-file.mp3");
            return {
                filePath : result,
                size : asset.resources[0].bytes,
                fileStream
            }
        } catch (error) {
            throw error;
        }   
    }
}
    export default AudioService;