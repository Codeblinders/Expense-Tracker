// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongoDB.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "https://expense-tracker-git-main-vivek-yadavs-projects-1528f86b.vercel.app",
        "https://expense-tracker-6g3aawvfe-vivek-yadavs-projects-1528f86b.vercel.app",
        "https://expense-tracker-zeta-two-28.vercel.app",
        "http://localhost:5173", // for local development
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

// routes
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
});
