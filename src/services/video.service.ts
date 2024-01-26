import { uploadStreamToCloudinary, uploadToCloudinary } from "../utils/couldinary.config.js";

class VideoService {
    /**
     * static async upload
     */
    public static async upload(files: any) {
        try {
            let cloudResult = await uploadStreamToCloudinary(files.path,files.originalname);

            console.log(cloudResult);
            return cloudResult;
        } catch (error) {
            throw error;
        }   
    }
}
    export default VideoService;