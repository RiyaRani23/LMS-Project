import express from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import connectDB from "./database/dbConnect.js";

dotenv.config({});

// call database connection 
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});