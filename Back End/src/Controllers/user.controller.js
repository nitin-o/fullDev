import { User } from "../models/user.models.js";
import { ApiError } from "../Utils/API_Erroe.js";
import { asyncHandler1 } from "../Utils/asyncHandler.js";
import { uploadFile } from "../Utils/CloudinaryServise.js";


const ganreateRefreshTokenAndAccessToken = async(userId)=>{
    try {
        const user = User.findOne({userId})

        console.log(user);
        

        const accessToken = user.ganerateAccessToken();
        const refreshToken = user.ganerateRefreshToken();

        user.refreshToken = refreshToken;
        user.save()

         return { accessToken , refreshToken }

    } catch (error) {
        throw new ApiError(500 , ("ganreateRefreshTokenAndAccessToken" ,error))
    }
    
}


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
           throw new ApiError (401 , "fields are required. Please provide email")
        }
        if (!password) {
           throw new ApiError (401 , "fields are required. Please provide password")
        }
   
       
        const user = await User.findOne({email})
        // or
        // User.findOne({ $or : [ { email } , { userName } ] } )
   
        if (!user) {
           throw new ApiError ( 404 , "email and userName is not exist")
        }
   
   
   
        const PasswordValid = await user.isPasswordCorrect(password);
        
        if (!PasswordValid) {
            throw new ApiError ( 404 , "Password Valid false")
        }
        
        
    
   
       res.status(201).json({
           success: true,
           message: "User login successfully!",
           data: req.body
       });
 } catch (error) {
    throw new ApiError (500 , error)
    
 }
    
})

export { register , login };
