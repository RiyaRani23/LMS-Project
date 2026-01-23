import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default cloudinary;

export const uploadMedia = async (filePath) => {
    try {
        const uploadResponse = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto", 
        });
        return uploadResponse;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
    } finally {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    }
};

export const deleteMediaFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log(error);
    }
};

import { v2 as cloudinary } from "cloudinary";

export const deleteVideoFromCloudinary = async (publicId) => {
    try {
         await cloudinary.uploader.destroy(publicId, {
            resource_type: "video",
        });
    } catch (error) {
        console.error("Cloudinary Delete Error:", error);
    }
};
