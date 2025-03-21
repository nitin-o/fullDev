import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";




const app = express();

app.use(cors({ origin: "http://localhost:5173" , credentials: true }));

// Middleware for JSON and URL-encoded form data
app.use(express.json({ limit: "30kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")) 
app.use(cookieParser());

import userRouter from "./Routes/user.routes.js";

app.use("/user", userRouter);

export default app;
