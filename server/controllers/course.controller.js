import { Course } from "../models/course.model.js";
import { uploadMedia, deleteMediaFromCloudinary } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
    try {
        const { courseTitle, category } = req.body;
        
        if (!courseTitle || !category) {
            return res.status(400).json({
                message: "Course title and category are required."
            });
        }

        const course = await Course.create({
            courseTitle,
            category,
            creator: req.id 
        });

        return res.status(201).json({
            course,
            message: "Course created successfully."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create course"
        });
    }
};

//  Get All Courses Created by a Specific Instructor
export const getCreatorCourses = async (req, res) => {
    try {
        const userId = req.id;
        const courses = await Course.find({ creator: userId });

        if(!courses){
            return res.status(404).json
({
    courses:[],
    message:"Courses not found"

})        }
        
        return res.status(200).json({
            courses
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to fetch courses"
        });
    }
};

export const editCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const { courseTitle, subTitle, description, category, courseLevel, coursePrice } = req.body;
        const thumbnail = req.file;

        let course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found!"
            });
        }

        let courseThumbnail = course.courseThumbnail; // Keep old one by default

        if (thumbnail) {
            if (course.courseThumbnail) {
                const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
                await deleteMediaFromCloudinary(publicId);
            }

            const uploadResponse = await uploadMedia(thumbnail.path);
            courseThumbnail = uploadResponse.secure_url;
        }

        const updateData = { 
            courseTitle, 
            subTitle, 
            description, 
            category, 
            courseLevel, 
            coursePrice, 
            courseThumbnail 
        };

        course = await Course.findByIdAndUpdate(courseId, updateData, { new: true });

        return res.status(200).json({
            course,
            message: "Course updated successfully."
        });

    } catch (error) {
        console.error("Edit Course Error:", error);
        return res.status(500).json({
            message: "Failed to update course"
        });
    }
};