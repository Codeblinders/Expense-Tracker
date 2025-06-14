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
    origin: "https://expense-tracker-zeta-two-28.vercel.app",    
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
