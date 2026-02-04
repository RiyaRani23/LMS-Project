import express from "express";
import upload from "../utils/multer.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCourse,
  editCourse,
  getCreatorCourses,
  getCourseById,
  createLecture,
  getCourseLectures,
  editLecture,
  getLectureById,
  removeLecture,
  togglePublishCourse,
  deleteCourse,
  getPublishedCourses,
  getCourseDetailById,
  getSearchCourse,
} from "../controllers/course.controller.js";

const router = express.Router();

router.route("/search").get(getSearchCourse); 
router.route("/detail/:courseId").get(getCourseDetailById);

// Course Routes
router.route("/").post(isAuthenticated, createCourse);
router.route("/").get(isAuthenticated, getCreatorCourses);
router.route("/published-courses").get(isAuthenticated, getPublishedCourses);

router
  .route("/:courseId")
  .get(isAuthenticated, getCourseById)
  .put(isAuthenticated, upload.single("courseThumbnail"), editCourse)
  .delete(isAuthenticated, deleteCourse);

router
  .route("/:courseId/lecture")
  .post(isAuthenticated, createLecture)
  .get(isAuthenticated, getCourseLectures);
  

router
  .route("/lecture/:lectureId")
  .get(isAuthenticated, getLectureById)
  .delete(isAuthenticated, removeLecture);

router
  .route("/:courseId/lecture/:lectureId")
  .patch(isAuthenticated, upload.single("videoFile"), editLecture);

router.route("/:courseId").patch(isAuthenticated, togglePublishCourse);

router.route("/:id").get(getCourseById);

export default router;
