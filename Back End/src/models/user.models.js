import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    firstName: { 
        type: String,
        required: false,

     },
    lastName: { type: String, required: false },
    email: { 
        type: String,
        required: true,
        lowecase : true,
        unique :true
        },
    password: { type: String, required: true },
    avatar: { type: String, required: false },
    covar_Image: { type: String, required: false },
    gender: { type: String, required: false },
    DOB : { type: String, required: false },
    refresh_Token :{ type: String, required: false },
    access_Token : { type: String, required: false },

}, { timestamps: true }); 



export const User = mongoose.model("User",userSchema)
