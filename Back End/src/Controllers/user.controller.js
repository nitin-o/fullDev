import { User } from "../models/user.models.js";
import { ApiError } from "../Utils/API_Erroe.js";
import { asyncHandler1 } from "../Utils/asyncHandler.js";
import { uploadFile } from "../Utils/CloudinaryServise.js";

        


const register =asyncHandler1( async (req, res, next) => {
    try {
         const {firstName, lastName,email ,password,gender,DOB} = req.body

         if (!firstName) {
            throw new ApiError (403 , "fields are required. Please provide firstName")
         }
         if (!lastName) {
            throw new ApiError (401 , "fields are required. Please provide lastName")
         }
         if (!email) {
            throw new ApiError (401 , "fields are required. Please provide email")
         }
         if (!password) {
            throw new ApiError (401 , "fields are required. Please provide password")
         }

        //  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        //  if (!emailRegex.test(email)) {
        //      throw new ApiError(400, "Invalid email format");
        //  }

        if (await User.findOne({email})) {
            throw new ApiError(400, "email is alradi exist");
        }
        
         if (password.length < 6) {
             throw new ApiError(400, "Password must be at least 6 characters");
         }


        
        
        const uploadedImage = await uploadFile(req.files.avatar[0].path);
        const avatarUrl = uploadedImage.secure_url || req.files.avatar[0].path;
       
       
        const user = await User.create({
            firstName,
            lastName,
            email,
            password, // Ideally, hash password before storing
            gender,
            DOB,
            avatar: avatarUrl,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully!",
            data: user
        });

    } catch (error) {
        next(error); // Pass the error to Express error handler
    }
});

const login = asyncHandler1 (async (req, res, next)=>{
    console.log("dee");
    
})

export { register , login };
