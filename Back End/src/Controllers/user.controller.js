import { User } from "../models/user.models.js";
import { ApiError } from "../Utils/API_Erroe.js";
import { ApiResponse } from "../Utils/Api_Response.js";
import { asyncHandler1 } from "../Utils/asyncHandler.js";
import { uploadFile } from "../Utils/CloudinaryServise.js";
import jwt from "jsonwebtoken";
import { REFRESH_TOKEN } from "../constants.js";


const ganreateRefreshTokenAndAccessToken = async(userId)=>{
    try {
        const user = await User.findById(userId)

        if (!user) {
            throw new ApiError(404, "User not found");
        }
        
        const accessToken = user.ganerateAccessToken();
        const refreshToken = user.ganerateRefreshToken();
       
        


        return { accessToken , refreshToken }

    } catch (error) {
        throw new ApiError(500 , ("ganreateRefreshTokenAndAccessToken" ,error))
    }
    
}


const register =asyncHandler1( async (req, res, next) => {
    try {
        
         const {firstName, lastName,email ,password,gender,DOB} = req.body

         if (!firstName) {
            return res.status(400).json({
                success: false,
                message: "firstName fields are required!",
            });
         }
         if (!lastName) {
            return res.status(400).json({
                success: false,
                message: "lastName fields are required!",
            });
         }
         if (!email) {
            return res.status(400).json({
                success: false,
                message: "email fields are required!",
            });
         }
         if (!password) {
            return res.status(400).json({
                success: false,
                message: "password fields are required!",
            });
         }

        //  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        //  if (!emailRegex.test(email)) {
        //      throw new ApiError(400, "Invalid email format");
        //  }

        if (password.length < 6) {
           return res.status(401).json({
               success: false,
               message: "Password must be at least 6 characters",
           });
        }

        if (await User.findOne({email})) {
            return res.status(402).json({
                success: false,
                message: "email is alradi exist",
            });
        }
        


         let avatarUrl =""
        if (req.files?.avatar?.length > 0) {
            
             const uploadedImage = await uploadFile(req?.files?.avatar[0]?.path);
              avatarUrl = uploadedImage?.secure_url || req?.files?.avatar[0]?.path;
        }
        
         
         
       
        const user = await User.create({
            firstName,
            lastName,
            email,
            password, // Ideally, hash password before storing
            gender,
            DOB,
            avatar: avatarUrl
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
    
 try {
       const {email , password } = req.body
       
       if (!email) {
        return res.status(400).json({
            success: false,
            message: "email fields are required!",
        });
        }
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "email and userName is not exist",
            });
        }
   
       
        const user = await User.findOne({email})
        // or
        // User.findOne({ $or : [ { email } , { userName } ] } )
   
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "email and userName is not exist",
            });
        }
   
   
   
        const PasswordValid = await user.isPasswordCorrect(password);
        
        if (!PasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Password Valid false",
            });
           
        }

      
        
        const {accessToken ,refreshToken} = await ganreateRefreshTokenAndAccessToken(user._id)

        const loginUser = await User.findById(user._id).select("-password -refresh_Token")



        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        };

      
        res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, { loginUser }, "User login successful")
        );


 } catch (error) {
    throw new ApiError (500 , error)
    
 }
    
})

const logout = asyncHandler1 (async(req, res, next)=>{

    

    await User.findByIdAndUpdate(
        req?.user?._id,
        {$set:{refresh_Token: undefined}},
        {new:true}
    )
    
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
    };


    res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(
        200,
        "user Logout successful"
    ))


})


const refreshAccessToken = asyncHandler1(async (req, res, next)=>{
    

    const token = req?.cookies?.refreshToken || req.header("Authorization")?.replace("Bearer ", "").trim();

    if (!token) {
         new ApiError(401,"Unauthorized access. Token is missing.")
        }

        
        const decodedToken = jwt.verify(token, REFRESH_TOKEN);

        const user = await User.findById(decodedToken?._id).select("-password");
        
        if (!user) {
            throw new ApiError(401, "Invalid access token. User not found.");
        }

        if (user.refresh_Token !== token) {
            throw new ApiError(401, "piz login");
        }


        const {refreshToken ,accessToken } =await ganreateRefreshTokenAndAccessToken(user._id)
        
        const options = {
            httpOnly : true ,
            secure : true
        }


        res.status(201)
       .cookie("accessToken" , accessToken , options)
       .cookie("refreshToken" , refreshToken , options)
       .json(
        new ApiResponse(
            200,
            {
                accessToken ,refreshToken
            },
            "user Login successful"
        )
       );
    
} )

const isLogin = asyncHandler1(async(req,res)=>{
    

       const options = {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        };

    res.status(200)
        .cookie("accessToken", res.accessToken, options)
        .json(
            {data:req.user}
        );
})



export { register , login , logout ,refreshAccessToken ,isLogin };
