import { Course } from "../models/course.model.js";
import { uploadMedia, deleteMediaFromCloudinary } from "../utils/cloudinary.js";
import { Lecture } from "../models/lecture.model.js";

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
            message: "Failed to update course",
            debugError: error.message
        });
    }
};


export const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found!"
            });
        }

        return res.status(200).json({
            course
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get course by id"
        });
    }
};

export const createLecture = async (req, res) => {
    try {
        const { lectureTitle } = req.body;
        const { courseId } = req.params;

        if (!lectureTitle || !courseId) {
            return res.status(400).json({
                message: "Lecture title and Course ID are required",
                success: false
            });
        }

        // 1. Find the course to ensure it exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found",
                success: false
            });
        }

        // 2. Create the lecture
        const lecture = await Lecture.create({
            lectureTitle,
            courseId
        });

        // 3. Push the lecture ID into the course's lecture array
        course.lectures.push(lecture._id);
        await course.save();

        return res.status(201).json({
            lecture,
            message: "Lecture created successfully.",
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create lecture",
            success: false
        });
    }
};

export const getCourseLectures = async (req, res) => {
    try {
        const { courseId } = req.params;
        
        const course = await Course.findById(courseId).populate("lectures");

        if (!course) {
            return res.status(404).json({
                message: "Course not found",
                success: false
            });
        }

        return res.status(200).json({
            lectures: course.lectures || [],
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to fetch lectures",
            success: false
        });
    }
};