import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
