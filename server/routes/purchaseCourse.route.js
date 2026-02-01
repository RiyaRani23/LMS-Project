import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js"; 
import { createCheckoutSession, getAllPurchasedCourses, getCourseStatus, stripeWebhook } from "../controllers/coursePurchase.controller.js";

const router = express.Router();

router.route("/checkout").post(isAuthenticated, createCheckoutSession);

router.route("/webhook").post(stripeWebhook);

router.route("/course-status/:courseId").get(isAuthenticated, getCourseStatus);
router.route("/").get(isAuthenticated, getAllPurchasedCourses);

export default router;