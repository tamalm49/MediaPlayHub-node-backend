import { ResourceApiResponse, UploadApiOptions, UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
// cloudinary configaration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true
});

export const uploadToCloudinary = async function (locaFilePath: string, folder?: string) {
  try {
    // locaFilePath :
    // path of image which was just uploaded to "uploads" folder

    var mainFolderName = 'main';
    // filePathOnCloudinary :
    // path of image we want when it is uploded to cloudinary

    const result = await cloudinary.uploader.upload(locaFilePath, {
      folder,
      resource_type: 'auto'
    });
    fs.unlinkSync(locaFilePath);

    return result;
  } catch (error) {
    // Remove file from local uploads folder
    fs.unlinkSync(locaFilePath);
    throw error;
  }
};
export const uploadStreamToCloudinary = async function (
  locaFilePath: string,
  filename: string,
  folder?: string
): Promise<UploadApiResponse | undefined> {
  try {
    // locaFilePath :
    // path of image which was just uploaded to "uploads" folder

    // Specify the target folder and file name on Cloudinary
    const cloudinaryUploadOptions: UploadApiOptions = {
      folder: folder || 'main',
      public_id: filename,
      resource_type: 'auto'
    };
    // Create a readable stream from a local file
    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(locaFilePath);
      // filePathOnCloudinary :
      // path of image we want when it is uploded to cloudinary

      const uploadStream = cloudinary.uploader.upload_stream(cloudinaryUploadOptions, (err, result) => {
        if (err) {
          reject(err);
        } else {
          fs.unlinkSync(locaFilePath);
          resolve(result);
        }
      });
      readStream.pipe(uploadStream);
    });
  } catch (error) {
    // Remove file from local uploads folder
    fs.unlinkSync(locaFilePath);
    throw error;
  }
};

export const downStreamFromCloudinary = (id: string): Promise<ResourceApiResponse> => {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.api.resources_by_asset_ids(id, (err: any, result: ResourceApiResponse) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  } catch (error) {
    throw error;
  }
};
