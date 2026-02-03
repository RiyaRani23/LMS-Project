import { Course } from "../models/course.model.js";
import { CourseProgress } from "../models/courseProgress.model.js";

// GET: Fetch progress
export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId).populate("lectures");
    if (!course) return res.status(404).json({ message: "Course not found" });

    const progress = await CourseProgress.findOne({ userId, courseId });

    // Check enrollment
    if (!course.enrolledStudents.includes(userId)) {
      return res.status(403).json({ success: false, message: "Not enrolled." });
    }

    res.status(200).json({
      success: true,
      course,
      progress: progress || { completedLectures: [], completed: false },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST: Toggle Lecture Completion
export const toggleLectureProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

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

    progress.completed = progress.completedLectures.length === course.lectures.length;

    await progress.save();

    return res.status(200).json({
      success: true,
      message: "Progress updated",
      progress,
      completedCount: progress.completedLectures.length,
      totalLectures: course.lectures.length,
      isCourseFinished: progress.completed,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};