import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { REFRESH_TOKEN ,REFRESH_TOKEN_EXPIRY,ACCESS_TOKEN,ACCESS_TOKEN_EXPIRY } from "../constants.js";

const userSchema = new Schema({
    firstName: { 
        type: String,
        required: false,

     },
    lastName: { 
        type: String, 
        required: false 
    },
    email: { 
        type: String,
        required: false,
        lowecase : true,
        unique :false
        },
    password: { 
        type: String, 
        required: true 
    
    },
    avatar: { 
        type: String, 
        required: false 

    },
    covar_Image: { 
        type: String, 
        required: false 

    },
    gender: { 
        type: String, 
        required: false 

    },
    DOB : { 
        type: String, 
        required: false 

    },
    refresh_Token :{ 
        type: String, 
        required: false 

    }
}, { timestamps: true }); 



userSchema.pre("save",async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password,10)
        console.log(bcrypt);
    }
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
     return await bcrypt.compare(password , this.password)
}

// ganerateAccessToken

userSchema.methods.ganerateAccessToken =  function () {
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            firstName : this.firstName,
            lastName : this.lastName
        },
        ACCESS_TOKEN,
        {
            expiresIn : ACCESS_TOKEN_EXPIRY
        }
    )
}


// ganerateRefreshToken

userSchema.methods.ganerateRefreshToken =  function () {
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            firstName : this.firstName,
            lastName : this.lastName
        },
        REFRESH_TOKEN,
        {
            expiresIn : REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User",userSchema)
