import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { 
    createCourse, 
    editCourse, 
    getCreatorCourses 
} from "../controllers/course.controller.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);

router.route("/").get(isAuthenticated, getCreatorCourses);

router.route("/:courseId").put(isAuthenticated, editCourse);

export default router;