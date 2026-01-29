import express from "express";
import upload from "../utils/multer.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { 
    createCourse, 
    editCourse, 
    getCreatorCourses,
    getCourseById, 
} from "../controllers/course.controller.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);

router.route("/").get(isAuthenticated, getCreatorCourses);

router.route("/:courseId")
  .get(isAuthenticated, getCourseById) 
  .put(isAuthenticated, upload.single("courseThumbnail"), editCourse);

export default router;