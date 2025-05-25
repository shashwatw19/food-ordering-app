import {v2 as cloudianry } from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()


cloudianry.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})


const uploadImageOnCloudinary = async (localFilePath: string): Promise<string | null> => {
    if (!localFilePath)
        return null;
    try {
        const response = await cloudianry.uploader.upload(localFilePath, { folder: 'food-app', resource_type: 'auto' });
        fs.unlinkSync(localFilePath);

        console.log('image uploaded on cloudinary', response?.secure_url);
        return response?.secure_url || null;
    } catch (e) {
        console.log(`error while uploading image`, e);
        
        return null;
    }
}


export {uploadImageOnCloudinary}