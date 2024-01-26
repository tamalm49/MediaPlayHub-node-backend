import { Audio } from "../models/audio.model.js";
import { uploadStreamToCloudinary, uploadToCloudinary } from "../utils/couldinary.config.js";
import { CustomError } from "../utils/error.handler.js";

class AudioService {
    /**
     * static async upload
     */
    public static async upload(files: any,body : any,user: any) {
        try {
            console.log(user);
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
}
    export default AudioService;