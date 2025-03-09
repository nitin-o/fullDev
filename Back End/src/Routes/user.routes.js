import { Router } from "express";
import { upload } from "../Middleware/FileUpload.Middleware.js"; // Ensure correct path
// import { uploadResult } from "../Utils/CloudinaryServise.js";
import { register } from "../Controllers/user.controller.js";


export function name(params) {
    www
}




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

export default userRouter;



