import { Router } from "express";
import { ApiError } from "../Utils/API_Erroe.js";
import { upload } from "../Middleware/FileUpload.Middleware.js"; // Ensure correct path
import { uploadResult } from "../Utils/CloudinaryServise.js";


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
    ]),
    async (req, res, next) => {
        try {
            const avatarImage = req?.files?.avatar[0].path
            console.log(avatarImage);
            
            if (!avatarImage) {
                throw new ApiError(400, "No file uploaded");
            }
            

            const responsCloudImage = await uploadResult(avatarImage)

            console.log(responsCloudImage);
            
























            
            
    
            res.json({
                message: "User registered successfully!",
                data: req.files // Only send necessary data
            });
        } catch (error) {
            next(error); // Pass the error to Express error handler
        }
    }
);

export default userRouter;



