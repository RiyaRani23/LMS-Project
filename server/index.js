import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/dbConnect.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js"

dotenv.config({});

// call database connection 
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow cookies to be sent with requests from this
}));

app.use("/api/v1/media", mediaRoute );

app.use("/api/v1/user", userRoute );

app.use("/api/v1/course", courseRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});