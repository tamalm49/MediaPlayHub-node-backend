import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
// cloudinary configaration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

export const uploadToCloudinary = async function (locaFilePath: string) {
    // locaFilePath :
    // path of image which was just uploaded to "uploads" folder

    var mainFolderName = "main"
    // filePathOnCloudinary :
    // path of image we want when it is uploded to cloudinary
    var filePathOnCloudinary = mainFolderName + "/" + locaFilePath

    return cloudinary.uploader.upload(locaFilePath, { "public_id": filePathOnCloudinary })
        .then((result) => {
            // Image has been successfully uploaded on cloudinary
            // So we dont need local image file anymore
            // Remove file from local uploads folder 
            fs.unlinkSync(locaFilePath)

            return {
                message: "Success",
                url: result.url
            };
        }).catch((error) => {
            // Remove file from local uploads folder 
            // fs.unlinkSync(locaFilePath)
            return { message: "Fail", };
        });
}
