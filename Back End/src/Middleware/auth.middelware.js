import { ApiError } from "../Utils/API_Erroe.js";
import { asyncHandler2 } from "../Utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN } from "../constants.js";
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler2(async (req, res, next) => {
    try {
        const token = req?.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "").trim();

        if (!token) {
            throw new ApiError(401, "Unauthorized access. Token is missing.");
        }

        const decodedToken = jwt.verify(token, ACCESS_TOKEN); // No need for `await`

        const user = await User.findById(decodedToken?._id).select("-password -refresh_Token");

        if (!user) {
            throw new ApiError(401, "Invalid access token. User not found.");
        }

        req.user = user;
        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            next(new ApiError(401, "Access token expired. Please log in again."));
        } else if (error.name === "JsonWebTokenError") {
            next(new ApiError(401, "Invalid access token."));
        } else {
            next(new ApiError(500, "Internal Server Error.")); // Generic error handling
        }
    }
});
