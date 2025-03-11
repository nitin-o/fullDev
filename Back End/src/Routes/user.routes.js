import { Router } from "express";
import { upload , body_form } from "../Middleware/FileUpload.Middleware.js"; // Ensure correct path
// import { uploadResult } from "../Utils/CloudinaryServise.js";
import { register, login } from "../Controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/register").post( 
    upload.fields([
            { 
            name: "avatar",
            maxCount : 1
        }, { 
            name: "profile",
            maxCount : 2 
        }
    ]),register
);

userRouter.route("/login").post(body_form.any() ,login)

export default userRouter;



