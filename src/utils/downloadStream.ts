import fs from "fs";
import axios, { AxiosRequestConfig } from "axios";

export const downloadByAxios = async(url : string)=>{
    try {
        // URL of the file you want to stream
// const fileUrl = 'https://res.cloudinary.com/dlyq7zbnn/video/upload/v1706295936/audio/wdgzdd9pz0bggoeccool.mp3';

// Destination path where you want to save the streamed file
const destinationPath = 'streamed-file.mp3';

// Axios configuration for streaming
const axiosConfig: AxiosRequestConfig = {
  method: 'get',
  url: url,
  responseType: 'stream',
};

// Make the Axios request to stream the file
const response = await axios(axiosConfig);

 // Create a writable stream to save the file locally
 const fileStream = fs.createWriteStream(destinationPath);

// Pipe the response stream into the local file
response.data.pipe(fileStream);
return new Promise((resolve, reject) => {
  fileStream.on('finish', resolve);
  fileStream.on('error', reject);
});
    } catch (error) {
        throw error;
    }
}
