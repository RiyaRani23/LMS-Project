import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseTitle: {
        type: String,
        required: [true, "Course title is required"],
        trim: true,
    },
    subTitle: {
        type: String,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: [true, "Course category is required"],
    },
    courseLevel: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advance"],
        default: "Beginner",
    },
    coursePrice: {
        type: Number,
        default: 0,
    },
    courseThumbnail: {
        type: String, // URL from Cloudinary
    },
    enrolledStudents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    lectures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lecture",
        }
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export const Course = mongoose.model("Course", courseSchema);