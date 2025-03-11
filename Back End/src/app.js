import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import {CORS_ORIGIN} from "./constants.js"

const app = express();

app.use(cors({ origin: CORS_ORIGIN , credentials: true }));

// Middleware for JSON and URL-encoded form data
app.use(express.json({ limit: "30kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")) 
app.use(cookieParser());




// const upload = multer();
// app.use(upload.any());


import userRouter from "./Routes/user.routes.js";

app.use("/user", userRouter);

export default app;
