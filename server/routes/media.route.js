import express from "express";
import upload from "../utils/multer.js";
import { uploadMedia } from "../utils/cloudinary.js";

const router = express.Router();

router.post("/upload-video", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const result = await uploadMedia(req.file.path);

        return res.status(200).json({
            success: true,
            message: "File uploaded successfully!",
            data: result 
        });
    } catch (error) {
        console.error("Media Upload Error:", error);
        return res.status(500).json({
            success: false,
            message: "Error uploading file"
        });
    }
});

export default router;