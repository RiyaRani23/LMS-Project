import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/dbConnect.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({});

// call database connection 
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:8080",
    credentials: true, // Allow cookies to be sent with requests from this
}));

//api
app.use("/api/v1/user", userRoute );


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});