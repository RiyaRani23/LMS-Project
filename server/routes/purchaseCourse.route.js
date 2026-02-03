import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js"; 
import { createCheckoutSession, getAllPurchasedCourses, getCourseDetailWithPurchaseStatus, stripeWebhook } from "../controllers/coursePurchase.controller.js";

const router = express.Router();

router.route("/checkout").post(isAuthenticated, createCheckoutSession);

router.route("/webhook").post(stripeWebhook);

router.get("/course-detail/:courseId", isAuthenticated, getCourseDetailWithPurchaseStatus);

router.route("/").get(getAllPurchasedCourses);

export default router;