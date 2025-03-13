import { ApiError } from "../Utils/API_Erroe.js";
import { asyncHandler2 } from "../Utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../constants.js";
import { User } from "../models/user.models.js";
import { login } from "../Controllers/user.controller.js";

export const verifyJWT = asyncHandler2(async (req, res, next) => {

    const accessToken = req?.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "").trim();
    
    if (!accessToken) {
        throw new ApiError(401, "Unauthorized access. Token is missing.");
    }
    
    try {
        const decodedToken = jwt.verify(accessToken, ACCESS_TOKEN);
        
        const user = await User.findById(decodedToken?._id).select("-password -refresh_Token");
        
        if (!user) {
            throw new ApiError(401, "Invalid access token. User not found.");
        }
        
        req.user = user;
        next();
    } catch (error) {
        const refreshToken = req?.cookies?.refreshToken || req.header("Authorization")?.replace("Bearer ", "").trim();
        if (!refreshToken) {
            throw new ApiError(401, "Unauthorized access. Token is missing.");
        }
        try {
            const decodedToken = jwt.verify(refreshToken, REFRESH_TOKEN);
            
            const user = await User.findById(decodedToken?._id).select("-password -refresh_Token");
            
            if (!user) {
                throw new ApiError(401, "Invalid refreshToken token. User not found.");
            }
            
            const accessToken = user.ganerateAccessToken();
            req.user=user
            res.accessToken=accessToken
            next()
            
        } catch (error) {
            res.status(400).json({
                success: false,
                message: "User piz login!",
            });
                
            }
        }
   

   
});
