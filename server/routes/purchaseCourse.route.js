import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js"; 
import { createCheckoutSession, getAllPurchasedCourses, getCourseDetailWithPurchaseStatus, stripeWebhook } from "../controllers/coursePurchase.controller.js";
import { getCourseProgress, updateLectureProgress } from "../controllers/courseProgress.controller.js";

const router = express.Router();

router.route("/checkout").post(isAuthenticated, createCheckoutSession);

router.route("/webhook").post(stripeWebhook);

router.get("/course-detail/:courseId", isAuthenticated, getCourseDetailWithPurchaseStatus);

router.route("/").get(getAllPurchasedCourses);

router.get("/course-progress/:courseId", isAuthenticated, getCourseProgress);

router.post("/course-progress/:courseId/lecture/:lectureId/view", isAuthenticated, updateLectureProgress);

export default router;