import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    lectureTitle: {
        type: String,
        required: [true, "Lecture title is required"],
        trim: true
    },
    videoUrl: {
        type: String, // Stores the URL from Cloudinary 
        default: ""
    },
    publicId: {
        type: String, // Necessary for deleting the video from Cloudinary later
        default: ""
    },
    isPreviewFree: {
        type: Boolean,
        default: false
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }
}, { timestamps: true });

export const Lecture = mongoose.model("Lecture", lectureSchema);