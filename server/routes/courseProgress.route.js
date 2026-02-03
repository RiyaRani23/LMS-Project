import express from "express";
import { getCourseProgress, toggleLectureProgress } from "../controllers/courseProgress.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/:courseId").get(isAuthenticated, getCourseProgress);
router.route("/:courseId/lecture/:lectureId/view").post(isAuthenticated, toggleLectureProgress);

export default router;