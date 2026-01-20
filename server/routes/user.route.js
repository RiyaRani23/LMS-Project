import express from "express";
import { register, login } from "../controllers/user.controller.js";
const router = express.Router();

// Registration Route
router.route("/register").post(register);

// Login Route
router.route("/login").post(login);

export default router;