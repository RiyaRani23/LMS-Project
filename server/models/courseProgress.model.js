import mongoose from "mongoose";

const lectureProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  lectureId: { type: mongoose.Schema.Types.ObjectId, ref: "Lecture" },
  watchedTime: { type: Number, default: 0 }, 
 
  viewed: { type: Boolean, default: false },
}, { timestamps: true });

const courseProgressSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true 
    },
    courseId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Course",
        required: true 
    },
  
    completed: { 
        type: Boolean, 
        default: false 
    },
  
    completedLectures: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Lecture" 
        }
    ],
}, { timestamps: true }); 

export const LectureProgress = mongoose.model("LectureProgress", lectureProgressSchema);
export const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);