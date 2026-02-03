import { Course } from "../models/course.model.js";
import { CourseProgress } from "../models/courseProgress.model.js";

export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    let progress = await CourseProgress.findOne({ userId, courseId });

    const isEnrolled = course.enrolledStudents.includes(userId);
    if (!isEnrolled) {
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this course.",
      });
    }

    res.status(200).json({
      success: true,
      course,
      progress: progress ? progress : { completedLectures: [] },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateLectureProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    let progress = await CourseProgress.findOne({ userId, courseId });

    if (!progress) {
      progress = new CourseProgress({
        userId,
        courseId,
        completedLectures: [lectureId], 
      });
    } else {
   
      const isAlreadyCompleted = progress.completedLectures.some(
        (id) => id.toString() === lectureId
      );

      if (isAlreadyCompleted) {
        progress.completedLectures = progress.completedLectures.filter(
          (id) => id.toString() !== lectureId
        );
      } else {
        progress.completedLectures.push(lectureId);
      }
    }

    await progress.save();

    return res.status(200).json({
      success: true,
      message: "Lecture progress updated",
      progress,
      completedCount: progress.completedLectures.length, 
      totalLectures: course.lectures.length,             
    });
  } catch (error) {
    console.error("Update Progress Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const markAsCompleted = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    let progress = await CourseProgress.findOne({ userId, courseId });

    if (!progress) {
      progress = new CourseProgress({
        userId,
        courseId,
        completedLectures: [lectureId],
      });
    } else {
     
      const isAlreadyCompleted = progress.completedLectures.some(
        (id) => id.toString() === lectureId
      );

      if (isAlreadyCompleted) {
      
        progress.completedLectures = progress.completedLectures.filter(
          (id) => id.toString() !== lectureId
        );
      } else {
       
        progress.completedLectures.push(lectureId);
      }
    }
    if (progress.completedLectures.length === course.lectures.length) {
      progress.completed = true;
    } else {
      progress.completed = false;
    }

    await progress.save();

    return res.status(200).json({
      success: true,
      message: "Lecture status updated successfully",
      progress,
      completedCount: progress.completedLectures.length,
      totalLectures: course.lectures.length,
      isCourseFinished: progress.completed
    });
  } catch (error) {
    console.error("Error in markAsCompleted:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};