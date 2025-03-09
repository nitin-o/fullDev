import { User } from "../models/user.models.js";
import { ApiError } from "../Utils/API_Erroe.js";
import { uploadFile } from "../Utils/CloudinaryServise.js";
//import cloudinary from "cloudinary"

// cloudinary.v2.config({
// cloud_name: 'derajrbyc',
// api_key: '237221189833634',
// api_secret: '_miUAlKtDtEI4rdX6HISTVAfkuk',
// secure: true,
// });
        


const register = async (req, res, next) => {
    try {
        const avatarImage = req?.files?.avatar?.[0]?.path; // Safer optional chaining
        console.log("Uploaded File Path:", avatarImage);


        const avatar = await uploadFile(avatarImage)


            console.log(avatar.secure_url);
            
        
        // User.create({})
        res.json({
            message: "User registered successfully!",
            data: req.files // Send only necessary data
        });

    } catch (error) {
        next(error); // Pass the error to Express error handler
    }
};

export { register };
